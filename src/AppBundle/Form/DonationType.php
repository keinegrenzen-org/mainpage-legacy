<?php

namespace AppBundle\Form;

use AppBundle\Entity\Album;
use JMS\TranslationBundle\Annotation\Ignore;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\MoneyType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DonationType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, array(
                'label' => 'donate.email.label',
                'required' => true
            ))
            ->add('albums', EntityType::class, array(
                'class' => 'AppBundle:Album',
                'choice_label' => 'title',
                'multiple' => true,
                'label' => /** @Ignore */
                    false,
                'attr' => array(
                    'class' => 'hidden',
                ),
            ))
            ->setAction('/savedonation');
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Donation'
        ));
    }
}
