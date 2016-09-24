<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Donation
 *
 * @ORM\Table(name="donation")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\DonationRepository")
 */
class Donation
{
    public function __construct()
    {
        $this->albums = new ArrayCollection();
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
     * @var
     * @ORM\ManyToMany(targetEntity="Album")
     * @ORM\JoinTable(name="donation_albums",
     *      joinColumns={@ORM\JoinColumn(name="donation_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="album_id", referencedColumnName="id")}
     *      )
     */
    private $albums;

    /**
     * @return mixed
     */
    public function getAlbums()
    {
        return $this->albums;
    }

    /**
     * @param mixed $albums
     */
    public function setAlbums($albums)
    {
        $this->albums = $albums;
    }

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    private $date;

    /**
     * @var int
     *
     * @ORM\Column(name="amount", type="integer")
     */
    private $amount;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255, nullable=true)
     */
    private $email;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Donation
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set amount
     *
     * @param integer $amount
     *
     * @return Donation
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get amount
     *
     * @return int
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return Donation
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    public function addAlbum(Album $album){
        $this->albums->add($album);
    }

    public function getFloatAmount(){
        return "" . $this->amount/100 . "€";
    }

    public function getDecimalAmount(){
        return "" . $this->amount/100;
    }

}

