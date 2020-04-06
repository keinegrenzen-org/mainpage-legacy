<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Controller that handles all public pages
 *
 * @package AppBundle\Controller
 */
class DefaultController extends Controller
{

    /**
     * Fetches all profiles and donation statistics and renders the homepage
     *
     * @Route("/", name="homepage")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return $this->render('AppBundle::placeholder.html.twig');
    }

    /**
     * Renders the imprint page
     *
     * @Route("/impressum", name="impressum")
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function imprintAction()
    {
        return $this->render('AppBundle::impressum.html.twig');
    }

    /**
     * Renders the TOS page
     *
     * @Route("/datenschutz", name="datenschutz")
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function datenschutzAction()
    {
        return $this->render('AppBundle::datenschutz.html.twig');
    }

    /**
     * Redirects to the donation page
     *
     * @Route("spenden", name="donate_external")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function donateExternalAction()
    {
        return $this->redirect("https://www.aerzte-ohne-grenzen.de/spenden-sammeln?cfd=barthyb");
    }

    /**
     * Finds and renders a profile
     *
     * @Route("/{UURL}", name="profile_show", requirements={"UURL": "(?!login|_?admin|checkrole\b)\b[\w-]+"})
     * @Method("GET")
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function showAction()
    {
        return $this->redirectToRoute('homepage');
    }

    /**
     * Downloads an album zip archive and increments its download count
     *
     * @Route("/download/{UURL}", name="download_album")
     * @Method("GET")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function downloadAction()
    {
        return $this->redirectToRoute('homepage');
    }
}
