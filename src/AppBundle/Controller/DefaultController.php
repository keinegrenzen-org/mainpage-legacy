<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Donation;
use AppBundle\Entity\FrontPage;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {

        $em = $this->getDoctrine()->getManager();
        // GET BLOGPOSTS
        $frontPages = $em
            ->getRepository('AppBundle:FrontPage')
            ->findBy(array('public' => true), array('id' => 'DESC'));

        $albums = $em
            ->getRepository('AppBundle:Album')
            ->findBy(array(), array('id' => 'DESC'));

        $donations = $em
            ->getRepository('AppBundle:Donation')
            ->findAll();

        $total = array_reduce($donations, function ($i, Donation $obj) {
            return $i += $obj->getAmount();
        });

        return $this->render('@AppBundle/Resources/views/index.html.twig', array(
            'frontPages' => $frontPages,
            'albums' => $albums,
            'total' => $total,
            'count' => sizeof($donations)
        ));
    }

    /**
     * @Route("/impressum", name="impressum")
     */
    public function impressumAction()
    {
        return $this->render('@App/impressum.html.twig');
    }

    /**
     * @Route("/datenschutz", name="datenschutz")
     */
    public function datenschutzAction()
    {
        return $this->render('@App/datenschutz.html.twig');
    }

    /**
     * Finds and displays a FrontPage entity.
     *
     * @Route("/{UURL}", name="profile_show", requirements={"UURL" = "barthy|invo|enna|wuis"})
     * @Method("GET")
     * @param FrontPage $frontPage
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction(FrontPage $frontPage)
    {
        return $this->render('AppBundle:frontpage:show.html.twig', array(
            'frontPage' => $frontPage,
        ));
    }

}
