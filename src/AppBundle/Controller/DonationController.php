<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Donation;
use AppBundle\Form\DonationType;
use Braintree\ClientToken;
use Braintree\Configuration;
use Braintree\Transaction;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DonationController extends Controller
{

    public function initBrainTree(){
        switch ($this->get('kernel')->getEnvironment()){
            case 'prod':
                Configuration::environment('production');
                Configuration::merchantId('276kv5yj784m8j5d');
                Configuration::publicKey('fhs5mmhbxjdfw9m3');
                Configuration::privateKey('e7a0a34104f976b9e4243527d97ba64c');
                break;
            case 'dev':
                Configuration::environment('sandbox');
                Configuration::merchantId('j8bt7dv9zpdddgn4');
                Configuration::publicKey('4k53bw3638bk9r7k');
                Configuration::privateKey('c77ec5c01084c6eae2446c4d63a9bab6');
                break;
            default:
                die($this->get('kernel')->getEnvironment());
        }
    }

    /**
     * @Route("/donate", name="add_donation")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function donateAction(Request $request)
    {
        $this->initBrainTree();

        $donation = new Donation();
        $em = $this->getDoctrine()->getManager();
        $albumCnt = 0;
        $albums = array();
        foreach ($_POST as $albumUURL) {
            $album = $em->getRepository("AppBundle:Album")
                ->findOneBy(array('UURL' => $albumUURL));
            if ($album != null) {
                $donation->addAlbum($album);
                $albumCnt++;
            }
        }
        switch ($albumCnt) {
            case 0:
            case 1:
                $donation->setAmount(500);
                break;
            case 2:
                $donation->setAmount(700);
                break;
            case 3:
            case 4:
                $donation->setAmount(1200);
                break;
            default:
                $donation->setAmount(1500);
                break;
        }

        $form = $this->createForm(/** @Ignore */DonationType::class, $donation, array('attr' => array('id' => 'checkout', 'class' => 'col-lg-4')));

        $clientToken = ClientToken::generate();

        return $this->render('AppBundle::donate.html.twig', array('form' => $form->createView(), 'donation' => $donation, 'albums' => $albums, 'clientToken' => $clientToken));
    }

    /**
     * @Route("/savedonation", name="save_donation")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function donationSaveAction(Request $request)
    {
        $this->initBrainTree();

        $donation = new Donation();
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(new DonationType(), $donation);
        $form->handleRequest($request);

        if ($form->isValid()) {

            $nonceFromTheClient = $request->get("payment_method_nonce");

            $result = Transaction::sale([
                'amount' => $donation->getDecimalAmount(),
                'paymentMethodNonce' => $nonceFromTheClient,
                'options' => [
                    'submitForSettlement' => True
                ]
            ]);

            if($result->success || !is_null($result->transaction)){
                $em->persist($donation);
                $em->flush();
                $session = $this->container->get('session');
                $session->getFlashBag()->add('message', $this->get('translator')->trans('donation.success'));
                return $this->redirect('/download/' . $donation->getId());
            }else {
                $errorString = "";
                foreach($result->errors->deepAll() as $error) {
                    $errorString .= 'Error: ' . $error->message . "\n";
                }

                $request->getSession()
                    ->getFlashBag()
                    ->add('error', $errorString);

                return $this->redirectToRoute('add_donation');
            }
        }

        return $this->createNotFoundException();
    }

    /**
     * @Route("/download/{donationId}", name="download")
     * @param $donationId
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function downloadAction($donationId)
    {
        $em = $this->getDoctrine()->getManager();
        $donation = $em->getRepository("AppBundle:Donation")
            ->findOneBy(array('id' => $donationId));
        return $this->render('AppBundle::download.html.twig', array('donation' => $donation));
    }

}