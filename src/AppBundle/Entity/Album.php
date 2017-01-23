<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\Date;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Album
 *
 * @ORM\Table(name="album")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\AlbumRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Album {

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="soundcloud", type="string", length=512)
     */
    private $soundcloud;

    /**
     * @ORM\OneToOne(targetEntity="Image", cascade={"remove", "persist"})
     */
    private $cover;

    /**
     * @ORM\Column(name="album_file_path", type="string", length=512)
     */
    private $albumFilePath;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var Date
     * @ORM\Column(name="published", type="date")
     */
    private $published;

    /**
     * @var FrontPage
     * @ORM\ManyToOne(targetEntity="FrontPage", inversedBy="albums")
     * @ORM\JoinColumn(name="frontPage_id", referencedColumnName="id")
     */
    private $frontPage;

    /**
     * @var string
     * @ORM\Column(name="url", type="string", length=255, unique=true)
     */
    private $UURL;

    /**
     * @var string
     * @ORM\Column(name="backgroundcolor", type="string", length=20)
     */
    private $backgroundColor;

    /**
     * @var string
     * @ORM\Column(name="primarycolor", type="string", length=20)
     */
    private $primaryColor;

    /**
     * @var string
     * @ORM\Column(name="secondarycolor", type="string", length=20)
     */
    private $secondaryColor;

    /**
     * @var boolean
     *
     * @ORM\Column(name="public", type="boolean")
     */
    private $public = false;

    /**
     * @ORM\Column(name="downloads", type="integer", nullable=true)
     */
    private $downloads;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Album
     */
    public function setTitle($title) {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle() {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Album
     */
    public function setDescription($description) {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * @return mixed
     */
    public function getPublished() {
        return $this->published;
    }

    /**
     * @param mixed $published
     */
    public function setPublished($published) {
        $this->published = $published;
    }

    /**
     * @return string
     */
    public function getUURL() {
        return $this->UURL;
    }

    /**
     * @param string $UURL
     */
    public function setUURL($UURL) {
        $this->UURL = $UURL;
    }

    /**
     * @return mixed
     */
    public function getCover() {
        return $this->cover;
    }

    /**
     * @param mixed $cover
     */
    public function setCover($cover) {
        $this->cover = $cover;
    }

    /**
     * @return FrontPage
     */
    public function getFrontPage() {
        return $this->frontPage;
    }

    /**
     * @param mixed $frontPage
     */
    public function setFrontPage($frontPage) {
        $this->frontPage = $frontPage;
    }

    /**
     * @return string
     */
    public function getBackgroundColor() {
        return $this->backgroundColor;
    }

    /**
     * @param string $backgroundColor
     */
    public function setBackgroundColor($backgroundColor) {
        $this->backgroundColor = $backgroundColor;
    }

    /**
     * @return string
     */
    public function getPrimaryColor() {
        return $this->primaryColor;
    }

    /**
     * @param string $primaryColor
     */
    public function setPrimaryColor($primaryColor) {
        $this->primaryColor = $primaryColor;
    }

    /**
     * @return string
     */
    public function getSecondaryColor() {
        return $this->secondaryColor;
    }

    /**
     * @param string $secondaryColor
     */
    public function setSecondaryColor($secondaryColor) {
        $this->secondaryColor = $secondaryColor;
    }

    /**
     * @return mixed
     */
    public function getSoundcloud() {
        return $this->soundcloud;
    }

    /**
     * @param mixed $soundcloud
     */
    public function setSoundcloud($soundcloud) {
        $this->soundcloud = $soundcloud;
    }

    public function getArtist() {
        return $this->getFrontPage()->getName();
    }

    public function __toString() {
        return $this . $this->getTitle() . ' - ' . $this->getArtist();
    }

    /**
     * @return boolean
     */
    public function getPublic() {
        return $this->public;
    }

    /**
     * @param $public
     * @return Album
     */
    public function setPublic($public) {
        $this->public = $public;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getAlbumFilePath() {
        return $this->albumFilePath;
    }

    /**
     * @param mixed $albumFilePath
     * @return Album
     */
    public function setAlbumFilePath($albumFilePath) {
        $this->albumFilePath = $albumFilePath;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDownloads() {
        return $this->downloads;
    }

    /**
     * @param mixed $downloads
     */
    public function setDownloads($downloads) {
        $this->downloads = $downloads;
    }

    /**
     * Increment download count by one
     */
    public function incrementDownloads() {
        if ($this->downloads == null) {
            $this->downloads = 1;
        } else {
            $this->downloads++;
        }
    }
}
