/**
 * Created by Barthy on 08.04.16.
 */

// setup an "add a tag" link
var $addTagLink = $('<a href="#"  class="add_link btn btn-green fa fa-plus"><i class="sr-only">Add</i>');
var $newLinkLi = $('<div class="col-lg-4 add_col"></div>').append($addTagLink.clone());

jQuery(document).ready(function () {
    // Get the ul that holds the collection of tags
    $('div.collection').each(function () {
        var $collection = $(this);
        var $newLinkLiClone = $newLinkLi.clone();
        // add a delete link to all of the existing tag form li elements
        $collection.find('div.col-lg-4').each(function () {
            var $removeFormA = $('<a href="#" class="remove_link btn btn-danger fa fa-remove"><i class="sr-only">Remove</i></a>');
            $(this).append($removeFormA);
            var $current = $(this);

            $removeFormA.on('click', function (e) {
                // prevent the link from creating a "#" on the URL
                e.preventDefault();

                // remove the li for the tag form
                $current.remove();
            });
        });

        // add the "add a tag" anchor and li to the tags ul
        $collection.append($newLinkLiClone);

        // count the current form inputs we have (e.g. 2), use that as the new
        // index when inserting a new item (e.g. 2)
        $collection.data('index', $collection.find(':input').length);

        $collection.find('.add_link').on('click', function (e) {
            // prevent the link from creating a "#" on the URL
            e.preventDefault();

            // add a new tag form (see next code block)
            // Get the data-prototype explained earlier
            var prototype = $collection.data('prototype');
            // get the new index
            var index = $collection.data('index');
            // Replace '__name__' in the prototype's HTML to
            // instead be a number based on how many items we have
            var newForm = prototype.replace("__name__label__", "");
            newForm = newForm.replace(/__name__/g, index);

            // increase the index with one for the next item
            $collection.data('index', index + 1);

            // Display the form in the page in an li, before the "Add a tag" link li
            var $newFormLi = $('<div class="col-lg-4 collection-col"></div>').append($('<div class="collectionItem"></div>').append(newForm));
            $newFormLi.find('.vich-image input').change(function () {
                readUrl(this);
            });
            $newLinkLiClone.before($newFormLi);

            // add a delete link to the new form
            var $removeFormA = $('<a href="#" class="remove_link btn btn-danger fa fa-remove"><i class="sr-only">Remove</i></a>');
            $newFormLi.append($removeFormA);

            $removeFormA.on('click', function (e) {
                // prevent the link from creating a "#" on the URL
                e.preventDefault();

                // remove the li for the tag form
                $newFormLi.remove();
            });
        });
    });
});