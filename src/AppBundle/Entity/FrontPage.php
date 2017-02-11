<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * FrontPage
 *
 * @ORM\Table(name="front_page")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FrontPageRepository")
 */
class FrontPage {

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
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
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
     * @ORM\Column(name="genre", type="string", length=255, nullable=true)
     */
    private $genre;

    /**
     * @var string
     *
     * @ORM\Column(name="vita", type="text", nullable=true)
     */
    private $vita;

    /**
     * @var string
     *
     * @ORM\Column(name="citations", type="text", nullable=true)
     */
    private $citations;

    /**
     * @var string
     *
     * @ORM\Column(name="metadesc", type="string", length=160, nullable=true)
     */
    private $metaDescription;

    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="Link", cascade={"persist", "remove"})
     * @ORM\JoinTable(name="frontpage_links",
     *      joinColumns={@ORM\JoinColumn(name="frontpage_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="link_id", referencedColumnName="id")}
     *      )
     */
    private $links;

    /**
     * @var Image
     *
     * @ORM\OneToOne(targetEntity="Image", cascade={"remove", "persist"})
     */
    private $image;

    /**
     * @var Image
     *
     * @ORM\OneToOne(targetEntity="Image", cascade={"remove", "persist"})
     */
    private $cover;

    /**
     *
     * @ORM\OneToMany(targetEntity="Album", mappedBy="frontPage", cascade={"remove", "persist"})
     * @ORM\OrderBy({"published" = "DESC"})
     */
    private $albums;

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
     * @return FrontPage
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
     * @param string $vita
     * @return FrontPage
     */
    public function setVita($vita) {
        $this->vita = $vita;

        return $this;
    }

    /**
     * Get vita
     *
     * @return string
     */
    public function getVita() {
        return $this->vita;
    }

    /**
     * Set links
     *
     * @param array $links
     * @return FrontPage
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
     * @param string $image
     * @return FrontPage
     */
    public function setImage($image) {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return string
     */
    public function getImage() {
        return $this->image;
    }

    /**
     * Set albums
     *
     * @param array $albums
     * @return FrontPage
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
     * @return FrontPage
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
    public function getCover() {
        return $this->cover;
    }

    /**
     * @param Image $cover
     */
    public function setCover($cover) {
        $this->cover = $cover;
    }

    /**
     * @return string
     */
    public function getCitations() {
        return $this->citations;
    }

    /**
     * @param string $citations
     */
    public function setCitations($citations) {
        $this->citations = $citations;
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
}
