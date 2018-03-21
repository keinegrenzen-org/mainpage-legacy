<?php

namespace AdminBundle\Controller;

use AppBundle\Entity\Album;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;

/**
 * Album controller.
 *
 * @Route("album")
 */
class AlbumController extends Controller
{
    /**
     * Lists all album entities.
     *
     * @Route("/", name="admin_album_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $albums = $em->getRepository('AppBundle:Album')->findAll();

        return $this->render('@Admin/album/index.html.twig', array(
            'albums' => $albums,
        ));
    }

    /**
     * Creates a new album entity.
     *
     * @Route("/new", name="admin_album_new")
     * @Method({"GET", "POST"})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function newAction(Request $request)
    {
        $album = new Album();
        $form = $this->createForm('AdminBundle\Form\AlbumType', $album);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($album);
            $em->flush();

            return $this->redirectToRoute('profile_show', array('UURL' => $album->getProfile()->getUURL()));
        }

        return $this->render('@Admin/album/edit.html.twig', array(
            'album' => $album,
            'form' => $form->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing album entity.
     *
     * @Route("/{id}/edit", name="admin_album_edit")
     * @Method({"GET", "POST"})
     * @param Request $request
     * @param Album $album
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request, Album $album)
    {
        $deleteForm = $this->createDeleteForm($album);
        $editForm = $this->createForm('AdminBundle\Form\AlbumType', $album);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('admin_album_edit', array('id' => $album->getId()));
        }

        return $this->render('@Admin/album/edit.html.twig', array(
            'album' => $album,
            'form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a album entity.
     *
     * @Route("/{id}", name="admin_album_delete")
     * @Method("DELETE")
     * @param Request $request
     * @param Album$album
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteAction(Request $request, Album $album)
    {
        $form = $this->createDeleteForm($album);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($album);
            $em->flush();
        }

        return $this->redirectToRoute('admin_album_index');
    }

    /**
     * Creates a form to delete a album entity.
     *
     * @param Album $album The album entity
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    private function createDeleteForm(Album $album)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('admin_album_delete', array('id' => $album->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
