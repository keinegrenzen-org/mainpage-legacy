<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DonationController extends Controller
{

    /**
     * @Route("/spenden", name="add_donation")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function donateAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $albumCnt = 0;
        $albums = array();
        foreach ($_POST as $albumUURL) {
            $album = $em->getRepository("AppBundle:Album")
                ->findOneBy(array('UURL' => $albumUURL));
            if ($album != null) {
                $albums[] = $album;
                $albumCnt++;
            }
        }
        switch ($albumCnt) {
            case 0:
                return $this->redirectToRoute('homepage');
            case 1:
                $amount = "5,00€";
                break;
            case 2:
                $amount = "10,00€";
                break;
            case 3:
            case 4:
                $amount = "15,00€";
                break;
            default:
                $amount = "20,00€";
                break;
        }

        return $this->render('AppBundle::donate.html.twig', array('albums' => $albums, 'amount' => $amount));
    }

}