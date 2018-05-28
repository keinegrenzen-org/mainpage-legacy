<?php

namespace AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller {

    /**
     * @Route("/", name="admin")
     */
    public function indexAction() {
        return $this->render('AdminBundle::index.html.twig');
    }

    /**
     * @Route("/email", name="admin_email")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function emailAction(Request $request) {

        $form = $this->createForm('AdminBundle\Form\SendEmailType');
        $form->handleRequest($request);

        $mailer = $this->get('mailer');

        if ($form->isSubmitted() && $form->isValid()) {

            $data = $form->getData();
            dump($data);

            $message = (new \Swift_Message($data['subject']))
                ->setFrom($data['from'])
                ->setTo($data['to'])
                ->setBody(
                    $this->renderView(
                        'AdminBundle::email_template.html.twig',
                        array(
                            'subject' => $data['subject'],
                            'text' => $data['text'],
                            'from' => $data['from'],
                            'to' => $data['to']
                        )
                    ),
                    'text/html'
                );

            $mailer->send($message);

            return $this->render('AdminBundle::email.html.twig', array(
                'message' => 'E-Mail sent.',
                'form' => $form->createView()
            ));
        }

        return $this->render('AdminBundle::email.html.twig', array(
            'form' => $form->createView()
        ));
    }
}