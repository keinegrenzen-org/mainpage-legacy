<?php

namespace AdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Donation
 *
 * @ORM\Table(name="donation")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\DonationRepository")
 */
class Donation {

    public function __construct() {
        $this->date = new \DateTime('now');
    }

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    private $date;

    /**
     * @var int
     *
     * @Assert\NotEqualTo(0)
     * @ORM\Column(name="amount", type="integer")
     */
    private $amount;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(min="2", max="255")
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;


    /**
     * Get id
     *
     * @return int
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Donation
     */
    public function setDate($date) {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate() {
        return $this->date;
    }

    /**
     * Set amount
     *
     * @param integer $amount
     *
     * @return Donation
     */
    public function setAmount($amount) {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get amount
     *
     * @return int
     */
    public function getAmount() {
        return $this->amount;
    }

    /**
     * Set email
     *
     * @param string $name
     *
     * @return Donation
     */
    public function setName($name) {
        $this->name = $name;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getName() {
        return $this->name;
    }

    public function addAlbum(Album $album) {
        $this->albums->add($album);
    }

    public function getFloatAmount() {
        return "" . $this->getAmount() / 100 . "€";
    }

    public function getDecimalAmount() {
        return "" . $this->getAmount() / 100;
    }

    public function getUSFormatAmout() {
        setlocale(LC_MONETARY, 'en_US');
        return money_format('%i', $this->getAmount());
    }

}

