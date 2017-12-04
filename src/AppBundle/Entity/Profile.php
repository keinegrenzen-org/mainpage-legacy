<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Profile
 *
 * @ORM\Table(name="profile")
 * @ORM\Entity()
 */
class Profile {

    public function __construct() {
        $this->albums = new ArrayCollection();
        $this->links = new ArrayCollection();
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
     * @var string
     *
     * @Assert\NotBlank()
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="short_name", type="string", length=255, nullable=true)
     */
    private $shortName;

    /**
     * @var string
     *
     * @ORM\Column(name="location", type="string", length=255, nullable=true)
     */
    private $location;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @ORM\Column(name="genre", type="string", length=255)
     */
    private $genre;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @ORM\Column(name="description", type="text")
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="quotes", type="text", nullable=true)
     */
    private $quotes;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(min="100", max="160")
     * @ORM\Column(name="meta_description", type="string", length=160)
     */
    private $metaDescription;

    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="Link", cascade={"persist", "remove"})
     * @ORM\JoinTable(name="profiles_links",
     *      joinColumns={@ORM\JoinColumn(name="profile_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="link_id", referencedColumnName="id")}
     *      )
     */
    private $links;

    /**
     * @var Image
     *
     * @ORM\OneToOne(targetEntity="Image", cascade={"remove", "persist"})
     */
    private $profileImage;

    /**
     * @var Image
     *
     * @ORM\OneToOne(targetEntity="Image", cascade={"remove", "persist"})
     */
    private $bannerImage;

    /**
     * @ORM\OneToMany(targetEntity="Album", mappedBy="profile", cascade={"remove", "persist"})
     */
    private $albums;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @ORM\Column(name="banner_video_path", type="string", length=160, nullable=true)
     */
    private $bannerVideoPath;

    /**
     * @var string
     *
     * @ORM\Column(name="youtube_link", type="string", length=160, nullable=true)
     */
    private $youtubeLink;

    /**
     * @var boolean
     *
     * @ORM\Column(name="public", type="boolean")
     */
    private $public = false;

    /**
     * @var string
     * @Assert\Regex(
     *     pattern = "/^[.a-zA-Z0-9-]+$/i",
     *     htmlPattern = "^[.a-zA-Z0-9-]+$",
     *     message="uurl.error.message"
     * )
     * @ORM\Column(name="url", type="string", length=255, unique=true)
     */
    private $UURL;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Profile
     */
    public function setName($name) {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * Set vita
     *
     * @param string $description
     * @return Profile
     */
    public function setDescription($description) {
        $this->description = $description;

        return $this;
    }

    /**
     * Get vita
     *
     * @return string
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * Set links
     *
     * @param array $links
     * @return Profile
     */
    public function setLinks($links) {
        $this->links = $links;

        return $this;
    }

    /**
     * Get links
     *
     * @return ArrayCollection
     */
    public function getLinks() {
        return $this->links;
    }

    /**
     * Set image
     *
     * @param string $profileImage
     * @return Profile
     */
    public function setProfileImage($profileImage) {
        $this->profileImage = $profileImage;

        return $this;
    }

    /**
     * Get image
     *
     * @return string
     */
    public function getProfileImage() {
        return $this->profileImage;
    }

    /**
     * Set albums
     *
     * @param array $albums
     * @return Profile
     */
    public function setAlbums($albums) {
        $this->albums = $albums;

        return $this;
    }

    /**
     * Get albums
     *
     * @return ArrayCollection
     */
    public function getAlbums() {
        return $this->albums;
    }

    /**
     * @return boolean
     */
    public function getPublic() {
        return $this->public;
    }

    /**
     * @param $public
     * @return Profile
     */
    public function setPublic($public) {
        $this->public = $public;
        return $this;
    }

    public function addLinks(Link $links) {
        $this->links->add($links);
    }

    public function removeLinks(Link $links) {
        $this->links->removeElement($links);
    }

    public function addAlbum(Album $album) {
        $this->albums->add($album);
    }

    public function removeAlbum(Album $album) {
        $this->albums->removeElement($album);
    }

    /**
     * @return mixed
     */
    public function getUURL() {
        return $this->UURL;
    }

    /**
     * @param mixed $UURL
     */
    public function setUURL($UURL) {
        $this->UURL = $UURL;
    }

    public function getUrl() {
        return '/' . $this->UURL;
    }

    public function __toString() {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getLocation() {
        return $this->location;
    }

    /**
     * @param string $location
     */
    public function setLocation($location) {
        $this->location = $location;
    }

    /**
     * @return Image
     */
    public function getBannerImage() {
        return $this->bannerImage;
    }

    /**
     * @param Image $bannerImage
     */
    public function setBannerImage($bannerImage) {
        $this->bannerImage = $bannerImage;
    }

    /**
     * @return string
     */
    public function getQuotes() {
        return $this->quotes;
    }

    /**
     * @param string $quotes
     */
    public function setQuotes($quotes) {
        $this->quotes = $quotes;
    }

    /**
     * @return string
     */
    public function getMetaDescription() {
        return $this->metaDescription;
    }

    /**
     * @param string $metaDescription
     */
    public function setMetaDescription($metaDescription) {
        $this->metaDescription = $metaDescription;
    }

    /**
     * @return string
     */
    public function getGenre() {
        return $this->genre;
    }

    /**
     * @param string $genre
     */
    public function setGenre($genre) {
        $this->genre = $genre;
    }

    /**
     * @return string
     */
    public function getShortName() {
        return $this->shortName;
    }

    /**
     * @param string $shortName
     */
    public function setShortName($shortName) {
        $this->shortName = $shortName;
    }

    /**
     * @return string
     */
    public function getBannerVideoPath() {
        return $this->bannerVideoPath;
    }

    /**
     * @param string $bannerVideoPath
     */
    public function setBannerVideoPath($bannerVideoPath) {
        $this->bannerVideoPath = $bannerVideoPath;
    }

    /**
     * @return string
     */
    public function getYoutubeLink() {
        return $this->youtubeLink;
    }

    /**
     * @param string $youtubeLink
     */
    public function setYoutubeLink($youtubeLink) {
        $this->youtubeLink = $youtubeLink;
    }
}
