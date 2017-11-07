<?php
/**
 * Created by PhpStorm.
 * User: Barthy
 * Date: 27.06.17
 * Time: 01:27
 */

namespace AppBundle\EventListener;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;

class BeforeRequestListener {

    private $em;
    private $authorizationChecker;
    private $tokenStorage;

    public function __construct(EntityManager $em, AuthorizationChecker $authorizationChecker, TokenStorage $tokenStorage) {
        $this->em = $em;
        $this->authorizationChecker = $authorizationChecker;
        $this->tokenStorage = $tokenStorage;
    }

    public function onKernelRequest(GetResponseEvent $event) {
        $request = $event->getRequest();
        $route = $request->attributes->get('_route');

        if ($route === 'easyadmin') {
            return;
        }

        if ($route === 'profile_show' && $this->authorizationChecker->isGranted('ROLE_ARTIST')) {
            $uurl = $request->attributes->get('UURL');
            $username = $this->tokenStorage->getToken()->getUsername();
            if ($uurl === $username || $username === 'admin') {
                return;
            }
        }

        $this->em
            ->getFilters()
            ->enable('published');
    }
}