<?php

namespace AppBundle\Controller;

use Doctrine\Common\Collections\Criteria;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PlanningController extends Controller {

    /**
     * @Route("/planung", name="planning")
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function planningAction() {
        $roleArtist = $this->get('security.authorization_checker')->isGranted('ROLE_ART');
        $roleCameraOp = $this->get('security.authorization_checker')->isGranted('ROLE_CAM');
        $role = "";
        if ($roleArtist) {
            $role = 'art';
        } else if ($roleCameraOp) {
            $role = 'cam';
        }
        $usr = $this->get('security.token_storage')->getToken()->getUser()->getUsername();

        $em = $this->getDoctrine()->getManager();
        $days = $em
            ->getRepository('AppBundle:Day')
            ->getAllStartingFromThisMonth();

        $months = array();

        foreach ($days as $day) {
            $months[$day->getDate()->format("n")][] = $day;
        }

        return $this->render('AppBundle::planning.html.twig', array(
            'months' => $months,
            'role' => $role,
            'username' => $usr
        ));

    }

    /**
     * @Route("/planung/reserve", name="reserve")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function reserveAction(Request $request) {
        $id = $request->get('id');
        $name = $request->get('name');
        $role = $request->get('role');

        $em = $this->getDoctrine()->getManager();
        $day = $em->getRepository('AppBundle:Day')
            ->findOneBy(array('id' => $id));

        if ($role == 'cam') {
            $day->setCameraOp($name);
        } else {
            $day->setArtist($name);
        }

        $em->persist($day);
        $em->flush();

        return new Response();
    }

    /**
     * @Route("/planung/free", name="free")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function freeAction(Request $request) {
        $id = $request->get('id');
        $role = $request->get('role');

        $em = $this->getDoctrine()->getManager();
        $day = $em->getRepository('AppBundle:Day')
            ->findOneBy(array('id' => $id));

        if ($role == 'cam') {
            $day->setCameraOp(null);
        } else {
            $day->setArtist(null);
        }

        $em->persist($day);
        $em->flush();

        return new Response();
    }

}