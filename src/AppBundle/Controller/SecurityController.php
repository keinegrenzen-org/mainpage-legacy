<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * Controoler that handles all security related functions
 *
 * @package AppBundle\Controller
 */
class SecurityController extends Controller {

    /**
     * @Route("/login", name="login")
     * @return \Symfony\Component\HttpFoundation\Response
     * @internal param Request $request
     */
    public function loginAction() {

        /**
         * @var AuthenticationUtils $authenticationUtils
         */
        $authenticationUtils = $this->get('security.authentication_utils');

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render(
            'AppBundle::login.html.twig',
            array(
                // last username entered by the user
                'last_username' => $lastUsername,
                'error' => $error,
            )
        );
    }

    /**
     * Checks the logged in user's role and redirects accordingly
     *
     * @Route("/checkrole", name="check_role")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function roleAction() {
        $authChecker = $this->get('security.authorization_checker');
        $roleArtist = $authChecker->isGranted('ROLE_ARTIST');
        $roleAdmin = $authChecker->isGranted('ROLE_ADMIN');

        if ($roleArtist && !$roleAdmin) {
            $username = $this->get('security.token_storage')->getToken()->getUsername();
            return $this->redirectToRoute('profile_show', array('UURL' => $username));
        }

        return $this->redirectToRoute('admin');
    }
}