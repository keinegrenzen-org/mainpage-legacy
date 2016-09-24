<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Donation;
use AppBundle\Form\DonationType;
use Stripe\Stripe;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DonationController extends Controller
{

    /**
     * @Route("/donate", name="add_donation")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function donateAction()
    {
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
                $donation->setAmount(0);
                break;
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

        $form = $this->createForm(new DonationType(), $donation, array('attr' => array('id' => 'payment-form', 'class' => 'col-lg-4')));

        return $this->render('AppBundle::donate.html.twig', array('form' => $form->createView(), 'donation' => $donation, 'albums' => $albums));
    }

    /**
     * @Route("/savedonation", name="save_donation")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response|\Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function donationSaveAction(Request $request)
    {
        $donation = new Donation();
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(new DonationType(), $donation);
        $form->handleRequest($request);

        if ($form->isValid()) {
            Stripe::setApiKey("sk_test_f3drm4mpfcEyVdDr835JjKNx");

            // Get the credit card details submitted by the form
            $token = $_POST['stripeToken'];

            // Create a charge: this will charge the user's card
            try {
                $charge = \Stripe\Charge::create(array(
                    "amount" => $donation->getAmount(), // Amount in cents
                    "currency" => "eur",
                    "source" => $token,
                    "description" => $donation->getEmail()
                ));
            } catch (\Stripe\Error\Card $e) {
                // The card has been declined
                return $this->createNotFoundException();
            }

            $em->persist($donation);
            $em->flush();
            $session = $this->container->get('session');
            $session->getFlashBag()->add('message', $this->get('translator')->trans('donation.success'));
            return $this->redirect('/download/' . $donation->getId());
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