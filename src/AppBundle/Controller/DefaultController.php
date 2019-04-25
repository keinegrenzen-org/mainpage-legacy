<?php

namespace AppBundle\Controller;

use AdminBundle\Entity\Album;
use AdminBundle\Entity\Profile;
use Doctrine\ORM\EntityManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;

/**
 * Controller that handles all public pages
 *
 * @package AppBundle\Controller
 */
class DefaultController extends Controller
{

    /**
     * @var EntityManager
     */
    private $em;

    /**
     * Increments the download count on an album.
     *
     * @param Album   $album increment count on this album
     * @param Request $request
     *
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     */
    private function addDownload(Album $album, Request $request)
    {
        $cookies[] = $request->cookies->all();
        $cookie = 'album_'.$album->getUURL();

        if (!isset($cookies[0][$cookie])) {
            $album->incrementDownloads();
            setcookie($cookie, true, time() + (3600 * 72));
        }

        $this->getEm()->persist($album);
        $this->getEm()->flush();
    }

    /**
     * Fetches all profiles and donation statistics and renders the homepage
     *
     * @Route("/", name="homepage")
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \Doctrine\ORM\NonUniqueResultException* @internal param Request $request
     */
    public function indexAction()
    {

        $profileRepository = $this->getEm()->getRepository('AdminBundle:Profile');
        $profiles = $profileRepository->findBy(['public' => true], ['id' => 'DESC']);
        $genres = $profileRepository->findAllGenres();

        $downloadCount = $this->getEm()->getRepository("AdminBundle:Album")->findDownloadCount();
        $statistics = $this->getEm()->getRepository('AdminBundle:Donation')->findStatistics();

        $bigPage = null;

        /**
         * @var $profile Profile
         */
        foreach ($profiles as $profile) {
            if ($profile->getUURL() === 'reloom') {
                $bigPage = $profile;
                break;
            }
        }

        return $this->render(
            'AppBundle::index.html.twig',
            [
                'profiles'      => $profiles,
                'total'         => $statistics['total'],
                'count'         => $statistics['donationCount'],
                'downloadCount' => $downloadCount,
                'genres'        => $genres,
                'bigPage'       => $bigPage,
            ]
        );
    }

    /**
     * Renders the imprint page
     *
     * @Route("/artist-count", name="artist_count")
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function artistCountAction()
    {
        $profileRepository = $this->getEm()->getRepository('AdminBundle:Profile');
        $count = $profileRepository->count(['public' => true]);

        return new Response($count, 200);
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
     * Redirects to the donation page
     *
     * @Route("wdr", name="stream_external")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function streamExternalAction()
    {
        return $this->redirect(
            "https://www1.wdr.de/unterhaltung/show-und-talk/der-sheriff/stream-der-sheriff-praesentiert-live-und-ungefiltert-100.html"
        );
    }

    /**
     * Finds and renders a profile
     *
     * @Route("/{UURL}", name="profile_show", requirements={"UURL": "(?!login|_?admin|checkrole\b)\b[\w-]+"})
     * @Method("GET")
     * @param Profile $profile
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function showAction(Profile $profile)
    {

        // Check if the user has access to the unpublished profile
        if ($profile->getPublic() === false) {
            $denyAccess = true;

            /**
             * @var AuthorizationChecker
             */
            $authorizationChecker = $this->get('security.authorization_checker');

            /**
             * @var TokenStorage
             */
            $tokenStorage = $this->get('security.token_storage');

            if ($authorizationChecker->isGranted('ROLE_ADMIN')) {
                // allow access to the admin
                $denyAccess = false;
            } elseif ($authorizationChecker->isGranted('ROLE_ARTIST')) {
                // allow access to the respective user
                $uurl = $profile->getUURL();
                $username = $tokenStorage->getToken()->getUsername();
                if ($uurl === $username) {
                    $denyAccess = false;
                }
            }

            if ($denyAccess === true) {
                return $this->redirectToRoute('login');
            }
        }

        return $this->render(
            'AppBundle::show.html.twig',
            [
                'profile' => $profile,
            ]
        );
    }

    /**
     * Downloads an album zip archive and increments its download count
     *
     * @Route("/download/{UURL}", name="download_album")
     * @Method("GET")
     * @param Album   $album
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     */
    public function downloadAction(Album $album, Request $request)
    {
        $this->addDownload($album, $request);

        $kernel = $this->get('kernel');
        $path = $kernel->getRootDir();

        return $this->file("$path/../web/uploads/albums/".$album->getAlbumFilePath());
    }

    /**
     * Sets the entity manager if it hasn't been used before and returns it.
     *
     * @return EntityManager
     */
    public function getEm()
    {
        if ($this->em == null) {
            $this->em = $this->getDoctrine()->getManager();
        }

        return $this->em;
    }
}
