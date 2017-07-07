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

class BeforeRequestListener {

    public function __construct(EntityManager $em) {
        $this->em = $em;
    }

    public function onKernelRequest(GetResponseEvent $event) {

        if ('easyadmin' === $event->getRequest()->attributes->get('_route')) {
            return;
        }

        $this->em
            ->getFilters()
            ->enable('published');
    }
}