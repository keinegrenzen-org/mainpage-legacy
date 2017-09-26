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
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;

class BeforeRequestListener {

    private $em;
    private $authorizationChecker;

    public function __construct(EntityManager $em, AuthorizationChecker $authorizationChecker) {
        $this->em = $em;
        $this->authorizationChecker = $authorizationChecker;
    }

    public function onKernelRequest(GetResponseEvent $event) {

        if ('easyadmin' === $event->getRequest()->attributes->get('_route')) {
            return;
        }

        if ($this->authorizationChecker->isGranted('ROLE_ARTIST')) {
            return;
        }

        $this->em
            ->getFilters()
            ->enable('published');
    }
}