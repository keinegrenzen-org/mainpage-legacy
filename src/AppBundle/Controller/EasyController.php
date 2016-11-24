<?php

namespace AppBundle\Controller;

use JavierEguiluz\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;

class EasyController extends BaseAdminController
{

    public function frontCSSAction()
    {
        $id = $this->request->query->get('id');
        $entity = $this->em->getRepository('AppBundle:FrontPage')->find($id);

        $content = $this->renderView('@App/frontpage/frontPage.css.twig', array(
            'frontPage' => $entity,
        ));

        $rootDir = $this->get('kernel')->getRootDir();

        $result = file_put_contents($rootDir . '/../web/profile/profile_' . $entity->getUURL() . '.css', $content);

        $this->request->getSession()
            ->getFlashBag()
            ->add(($result !== FALSE) ? 'success' : 'error', ($result !== FALSE) ? 'CSS generated!' : 'CSS generation failed');

        // redirect to the 'edit' view of the given entity item
        return $this->redirectToRoute('easyadmin', array(
            'view' => 'edit',
            'id' => $id,
            'entity' => $this->request->query->get('entity'),
        ));
    }

    public function albumCSSAction()
    {
        $id = $this->request->query->get('id');
        $entity = $this->em->getRepository('AppBundle:Album')->find($id);

        $content = $this->renderView('@App/album/album.css.twig', array(
            'album' => $entity,
        ));

        $rootDir = $this->get('kernel')->getRootDir();

        $result = file_put_contents($rootDir . '/../web/album/album_' . $entity->getUURL() . '.css', $content);

        $this->request->getSession()
            ->getFlashBag()
            ->add(($result !== FALSE) ? 'success' : 'error', ($result !== FALSE) ? 'CSS generated!' : 'CSS generation failed');

        // redirect to the 'edit' view of the given entity item
        return $this->redirectToRoute('easyadmin', array(
            'action' => 'list',
            'entity' => $this->request->query->get('entity'),
        ));
    }

}