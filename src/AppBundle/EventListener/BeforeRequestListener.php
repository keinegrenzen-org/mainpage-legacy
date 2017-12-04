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

/**
 * Listener that enables the "published" filter only when it is needed
 * @package AppBundle\EventListener
 */
class BeforeRequestListener {

    /**
     * @var EntityManager
     */
    private $em;

    /**
     * Sets the entity manager injected into the service
     *
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em) {
        $this->em = $em;
    }

    /**
     * @param GetResponseEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event) {
        $request = $event->getRequest();
        $route = $request->attributes->get('_route');

        // Don't enable the "published" filter for the admin backend
        if ($route === 'easyadmin') {
            return;
        }

        // Don't enable the "published" filter if the user is authenticated as admin or as the profile artist
        if ($route === 'profile_show') {
            return;
        }

        $this->em
            ->getFilters()
            ->enable('published');
    }
}