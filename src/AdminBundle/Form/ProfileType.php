<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ProfileType extends AbstractType {

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
            ->add('name')
            ->add('shortName')
            ->add('location')
            ->add('genre')
            ->add('description')
            ->add('quotes')
            ->add('metaDescription')
            ->add('bannerVideoPath')
            ->add('youtubeLink')
            ->add('public')
            ->add('UURL')
            ->add('links')
            ->add('profileImage')
            ->add('bannerImage');
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Profile'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix() {
        return 'appbundle_profile';
    }


}
