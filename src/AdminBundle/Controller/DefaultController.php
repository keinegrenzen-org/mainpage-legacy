<?php

namespace AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\VarDumper\VarDumper;

class DefaultController extends Controller
{

    /**
     * @Route("/", name="admin")
     */
    public function indexAction()
    {
        return $this->render('AdminBundle::index.html.twig');
    }

    /**
     * @Route("/email", name="admin_email")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function emailAction(Request $request)
    {

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
                            'to' => $data['to'],
                        )
                    ),
                    'text/html'
                );

            $mailer->send($message);

            return $this->render(
                'AdminBundle::email.html.twig',
                array(
                    'message' => 'E-Mail sent.',
                    'form' => $form->createView(),
                )
            );
        }

        return $this->render(
            'AdminBundle::email.html.twig',
            array(
                'form' => $form->createView(),
            )
        );
    }

    /**
     * @Route("/booking", name="admin_email")
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function romeoAction()
    {

        $mailer = $this->get('mailer');

        $message = (new \Swift_Message('keinegrenzen.org — Gemeinnütziges Festival mit Faber'))
            ->setFrom('barthy@keinegrenzen.org')
            ->setTo('rabanrzany@gmail.com')
            ->setBody(
                file_get_contents('/Users/Barthy/Desktop/faber.html'),
                'text/html'
            );

        $mailer->send($message);

        VarDumper::dump("E-Mail sent.");
        VarDumper::dump($message);

        return $this->render(
            'AdminBundle::base.html.twig',
            array(
                'message' => 'E-Mail sent.',
            )
        );
    }
}