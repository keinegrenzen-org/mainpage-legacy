<?php

namespace AdminBundle\Controller;

use AdminBundle\Entity\Donation;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;

/**
 * Donation controller.
 *
 * @Route("donation")
 */
class DonationController extends Controller
{
    /**
     * Lists all donation entities.
     *
     * @Route("/", name="admin_donation_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $donations = $em->getRepository('AdminBundle:Donation')->findAll();

        return $this->render('AdminBundle:donation:index.html.twig', array(
            'donations' => $donations,
        ));
    }

    /**
     * Creates a new donation entity.
     *
     * @Route("/new", name="admin_donation_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $donation = new Donation();
        $form = $this->createForm('AdminBundle\Form\DonationType', $donation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($donation);
            $em->flush();

            return $this->redirectToRoute('admin_donation_index');
        }

        return $this->render('AdminBundle:donation:edit.html.twig', array(
            'donation' => $donation,
            'form' => $form->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing donation entity.
     *
     * @Route("/{id}/edit", name="admin_donation_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Donation $donation)
    {
        $deleteForm = $this->createDeleteForm($donation);
        $editForm = $this->createForm('AdminBundle\Form\DonationType', $donation);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('admin_donation_edit', array('id' => $donation->getId()));
        }

        return $this->render('AdminBundle:donation:edit.html.twig', array(
            'donation' => $donation,
            'form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a donation entity.
     *
     * @Route("/{id}", name="admin_donation_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Donation $donation)
    {
        $form = $this->createDeleteForm($donation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($donation);
            $em->flush();
        }

        return $this->redirectToRoute('admin_donation_index');
    }

    /**
     * Creates a form to delete a donation entity.
     *
     * @param Donation $donation The donation entity
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    private function createDeleteForm(Donation $donation)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('admin_donation_delete', array('id' => $donation->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
