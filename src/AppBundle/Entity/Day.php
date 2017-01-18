<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Day
 *
 * @ORM\Table(name="day")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\DayRepository")
 */
class Day
{
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
     * @ORM\Column(name="date", type="date", unique=true)
     */
    private $date;

    /**
     * @var bool
     *
     * @ORM\Column(name="available", type="boolean")
     */
    private $available;

    /**
     * @var string
     *
     * @ORM\Column(name="cameraOp", type="string", length=255, nullable=true)
     */
    private $cameraOp;

    /**
     * @var string
     *
     * @ORM\Column(name="artist", type="string", length=255, nullable=true)
     */
    private $artist;


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
     * @return Day
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
     * Set available
     *
     * @param boolean $available
     *
     * @return Day
     */
    public function setAvailable($available)
    {
        $this->available = $available;

        return $this;
    }

    /**
     * Get available
     *
     * @return bool
     */
    public function getAvailable()
    {
        return $this->available;
    }

    /**
     * Set cameraOp
     *
     * @param string $cameraOp
     *
     * @return Day
     */
    public function setCameraOp($cameraOp)
    {
        $this->cameraOp = $cameraOp;

        return $this;
    }

    /**
     * Get cameraOp
     *
     * @return string
     */
    public function getCameraOp()
    {
        return $this->cameraOp;
    }

    /**
     * Set artist
     *
     * @param string $artist
     *
     * @return Day
     */
    public function setArtist($artist)
    {
        $this->artist = $artist;

        return $this;
    }

    /**
     * Get artist
     *
     * @return string
     */
    public function getArtist()
    {
        return $this->artist;
    }
}

