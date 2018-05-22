<?php
/**
 * Created by PhpStorm.
 * User: Barthy
 * Date: 22.05.18
 * Time: 19:06
 */

namespace AdminBundle\Form;

use Ivory\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class SendEmailType extends AbstractType {

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
            ->add('subject', TextType::class, array(
                'label' => 'Subject',
                'required' => true
            ))
            ->add('text', CKEditorType::class, array(
                'label' => 'Text',
                'required' => true,
                'attr' => array(
                    'rows' => 20
                )
            ))
            ->add('from', EmailType::class, array(
                'label' => 'From',
                'required' => true
            ))
            ->add('to', EmailType::class, array(
                'label' => 'To',
                'required' => true
            ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix() {
        return 'adminbundle_email';
    }

}