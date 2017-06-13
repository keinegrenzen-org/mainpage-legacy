<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Album;
use AppBundle\Entity\Donation;
use AppBundle\Entity\FrontPage;
use AppBundle\Entity\Page;
use Doctrine\ORM\EntityManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller {

    /**
     * @var EntityManager
     */
    private $em;

    private function addVisit($route, $name, Request $request) {
        $page = $this->getDoctrine()
            ->getRepository('AppBundle:Page')
            ->findOneBy(array('route' => $route));

        if (!$page) {
            $page = new Page();
            $page->setRoute($route);
            $page->setName($name);
            $page->setVisits(1);

            setcookie($route, true, time() + (3600 * 12));
        } else {
            $cookies[] = $request->cookies->all();

            if (!isset($cookies[0][$route])) {
                $page->incrementVisits();
                setcookie($route, true, time() + (3600 * 12));
            }
        }

        $this->getEm()->persist($page);
        $this->getEm()->flush();
    }

    private function addDownload(Album $album, Request $request) {
        $cookies[] = $request->cookies->all();
        $cookie = 'album_' . $album->getUURL();

        if (!isset($cookies[0][$cookie])) {
            $album->incrementDownloads();
            setcookie($cookie, true, time() + (3600 * 72));
        }

        $this->getEm()->persist($album);
        $this->getEm()->flush();
    }

    /**
     * @Route("/", name="homepage")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request) {

        // GET BLOGPOSTS
        $frontPages = $this->getEm()
            ->getRepository('AppBundle:FrontPage')
            ->findBy(array('public' => true), array('id' => 'DESC'));

        $albums = $this->getEm()
            ->getRepository('AppBundle:Album')
            ->findBy(array(), array('id' => 'DESC'));

        $donations = $this->getEm()
            ->getRepository('AppBundle:Donation')
            ->findAll();

        $total = array_reduce($donations, function ($i, Donation $obj) {
            return $i += $obj->getAmount();
        });

        $this->addVisit("/", "Index", $request);

        return $this->render('AppBundle::index.html.twig', array(
            'frontPages' => $frontPages,
            'albums' => $albums,
            'total' => $total,
            'count' => sizeof($donations)
        ));
    }

    /**
     * @Route("/impressum", name="impressum")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function imprintAction(Request $request) {
        $this->addVisit("/impressum", "Impressum", $request);
        return $this->render('@App/impressum.html.twig');
    }

    /**
     * @Route("/datenschutz", name="datenschutz")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function datenschutzAction(Request $request) {
        $this->addVisit("/datenschutz", "Datenschutz", $request);
        return $this->render('@App/datenschutz.html.twig');
    }

    /**
     * Finds and displays a FrontPage entity.
     *
     * @Route("/{UURL}", name="profile_show", requirements={"UURL" = "barthy|invo|enna|wuis"})
     * @Method("GET")
     * @param FrontPage $frontPage
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction(FrontPage $frontPage, Request $request) {
        $this->addVisit("/" . $frontPage->getUURL(), $frontPage->getName(), $request);

        return $this->render('AppBundle:frontpage:show.html.twig', array(
            'frontPage' => $frontPage,
        ));
    }

    /**
     * Finds and displays a FrontPage entity.
     *
     * @Route("/download/{UURL}", name="download_album")
     * @Method("GET")
     * @param Album $album
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function downloadAction(Album $album, Request $request) {
        $this->addDownload($album, $request);

        return $this->redirect("/uploads/albums/" . $album->getAlbumFilePath());
    }

    /**
     * @return EntityManager
     */
    public function getEm() {
        if ($this->em == null) {
            $this->em = $this->getDoctrine()->getManager();
        }
        return $this->em;
    }

    /**
     * @Route("donate", name="donate_external")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function donateExternalAction(){
        return $this->redirect("https://www.aerzte-ohne-grenzen.de/spenden-sammeln?cfd=barthyb");
    }

}
