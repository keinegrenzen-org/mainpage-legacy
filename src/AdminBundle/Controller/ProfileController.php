<?php

namespace AdminBundle\Controller;

use AppBundle\Entity\Profile;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * Profile controller.
 *
 * @Route("/profile")
 */
class ProfileController extends Controller {

    /**
     * Lists all profile entities.
     *
     * @Route("/", name="admin_profile_index")
     * @Method("GET")
     */
    public function indexAction() {
        $em = $this->getDoctrine()->getManager();

        $profiles = $em->getRepository('AppBundle:Profile')->findAll();

        return $this->render('@Admin/profile/index.html.twig', array(
            'profiles' => $profiles,
        ));
    }

    /**
     * Creates a new profile entity.
     *
     * @Route("/new", name="admin_profile_new")
     * @Method({"GET", "POST"})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function newAction(Request $request) {
        $profile = new Profile();
        $form = $this->createForm('AdminBundle\Form\ProfileType', $profile);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($profile);
            $em->flush();

            return $this->redirectToRoute('profile_show', array('UURL' => $profile->getUURL()));
        }

        return $this->render('@Admin/profile/new.html.twig', array(
            'profile' => $profile,
            'form' => $form->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing profile entity.
     *
     * @Route("/{id}/edit", name="admin_profile_edit")
     * @Method({"GET", "POST"})
     * @param Request $request
     * @param Profile $profile
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request, Profile $profile) {
        $deleteForm = $this->createDeleteForm($profile);
        $editForm = $this->createForm('AdminBundle\Form\ProfileType', $profile);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('admin_profile_edit', array('id' => $profile->getId()));
        }

        return $this->render('@Admin/profile/edit.html.twig', array(
            'profile' => $profile,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a profile entity.
     *
     * @Route("/{id}", name="admin_profile_delete")
     * @Method("DELETE")
     * @param Request $request
     * @param Profile $profile
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteAction(Request $request, Profile $profile) {
        $form = $this->createDeleteForm($profile);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($profile);
            $em->flush();
        }

        return $this->redirectToRoute('admin_profile_index');
    }

    /**
     * Creates a form to delete a profile entity.
     *
     * @param Profile $profile The profile entity
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    private function createDeleteForm(Profile $profile) {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('admin_profile_delete', array('id' => $profile->getId())))
            ->setMethod('DELETE')
            ->getForm();
    }
}
