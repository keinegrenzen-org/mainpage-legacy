<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\Date;

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
     * @ORM\Column(name="sound_cloud_link", type="string", length=512)
     */
    private $soundCloudLink;

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
     * @ORM\Column(name="release_date", type="date")
     */
    private $releaseDate;

    /**
     * @var Profile
     * @ORM\ManyToOne(targetEntity="Profile", inversedBy="albums")
     * @ORM\JoinColumn(name="profile_id", referencedColumnName="id")
     */
    private $profile;

    /**
     * @var string
     * @ORM\Column(name="url", type="string", length=255, unique=true)
     */
    private $UURL;

    /**
     * @var string
     * @ORM\Column(name="background_color", type="string", length=20)
     */
    private $backgroundColor;

    /**
     * @var string
     * @ORM\Column(name="primary_color", type="string", length=20)
     */
    private $primaryColor;

    /**
     * @var string
     * @ORM\Column(name="secondary_color", type="string", length=20)
     */
    private $secondaryColor;

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
    public function getReleaseDate() {
        return $this->releaseDate;
    }

    /**
     * @param mixed $releaseDate
     */
    public function setReleaseDate($releaseDate) {
        $this->releaseDate = $releaseDate;
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
     * @return Profile
     */
    public function getProfile() {
        return $this->profile;
    }

    /**
     * @param mixed $profile
     */
    public function setProfile($profile) {
        $this->profile = $profile;
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
    public function getSoundCloudLink() {
        return $this->soundCloudLink;
    }

    /**
     * @param mixed $soundCloudLink
     */
    public function setSoundCloudLink($soundCloudLink) {
        $this->soundCloudLink = $soundCloudLink;
    }

    public function getArtist() {
        return $this->getProfile()->getName();
    }

    public function __toString() {
        return $this . $this->getTitle() . ' - ' . $this->getArtist();
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
