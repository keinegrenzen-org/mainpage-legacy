<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Album;
use AppBundle\Entity\Donation;
use AppBundle\Entity\FrontPage;
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
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function indexAction() {

        $frontPages = $this->getEm()
            ->getRepository('AppBundle:FrontPage')
            ->findBy(array('public' => true), array('id' => 'DESC'));

        $donations = $this->getEm()
            ->getRepository('AppBundle:Donation')
            ->findAll();

        $total = array_reduce($donations, function ($i, Donation $obj) {
            $i += $obj->getAmount();
            return $i;
        });

        $bigPage = null;

        /**
         * @var $page FrontPage
         */
        foreach ($frontPages as $page){
            if($page->getUURL() === 'wuis'){
                $bigPage = $page;
                break;
            }
        }

        return $this->render('AppBundle::index.html.twig', array(
            'frontPages' => $frontPages,
            'total' => $total,
            'count' => sizeof($donations),
            'bigPage' => $bigPage
        ));
    }

    /**
     * @Route("/impressum", name="impressum")
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function imprintAction() {
        return $this->render('@App/impressum.html.twig');
    }

    /**
     * @Route("/datenschutz", name="datenschutz")
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function datenschutzAction() {
        return $this->render('@App/datenschutz.html.twig');
    }

    /**
     * @Route("donate", name="donate_external")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function donateExternalAction() {
        return $this->redirect("https://www.aerzte-ohne-grenzen.de/spenden-sammeln?cfd=barthyb");
    }

    /**
     * Finds and displays a FrontPage entity.
     *
     * @Route("/{UURL}", name="profile_show", requirements={"UURL": "(?!login|admin\b)\b\w+"})
     * @Method("GET")
     * @param FrontPage $frontPage
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function showAction(FrontPage $frontPage) {
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

}
