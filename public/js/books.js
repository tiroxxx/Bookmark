/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */

// Script to display Google Maps
// Google Maps API
let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;
function initMap() {
    // Initializing variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow();
    currentInfoWindow = infoWindow;
    infoPane = document.getElementById("panel");

    // Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map = new google.maps.Map(document.getElementById("map"), {
                    center: pos,
                    zoom: 10,
                });

                bounds.extend(pos);
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setCenter(pos);

                // Display places near the user
                getNearbyPlaces(pos);
            },
            () => {
                // Browser supports geolocation, but user denies permission
                handleLocationError(true, infoWindow);
            }
        );
    } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infoWindow);
    }
}

// If there is a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow) {
    // Set default location to Orlando, Florida
    pos = { lat: 28.5492, lng: -81.3798 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 10,
    });

    // If there is an error, let the user know
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Geolocation permissions denied. Using default location."
            : "Error: Your browser doesn't support geolocation."
    );

    infoWindow.open(map);
    currentInfoWindow = infoWindow;

    // Display places in Orlando, Florida
    getNearbyPlaces(pos);
}

// Search for nearby palces
function getNearbyPlaces(position) {
    const request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: "library",
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

// Handle the results of the search
function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
    }
}

// Set a marker at each location
function createMarkers(places) {
    places.forEach((place) => {
        const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
        });

        // Add click listener to each marker
        google.maps.event.addListener(marker, "click", () => {
            const request = {
                placeId: place.place_id,
                fields: [
                    "name",
                    "formatted_address",
                    "geometry",
                    "rating",
                    "website",
                    "photos",
                ],
            };
            // Only fetch the details of a place when the user clicks on a marker
            service.getDetails(request, (placeResult, status) => {
                showDetails(placeResult, marker, status);
            });
        });
        // Adjust the map bounds to include the location of this marker
        bounds.extend(place.geometry.location);
    });
    // Once all the markers have been placed, adjust the bounds of the map to show all the markers within the visible area.
    map.fitBounds(bounds);
}

// Displays details above the marker
function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        const placeInfowindow = new google.maps.InfoWindow();
        placeInfowindow.setContent(
            "<div><strong>" +
            placeResult.name +
            "</strong><br>" +
            "Rating: " +
            placeResult.rating +
            "</div>"
        );
        placeInfowindow.open(marker.map, marker);
        currentInfoWindow.close();
        currentInfoWindow = placeInfowindow;
        showPanel(placeResult);
    } else {
        console.log("showDetails failed: " + status);
    }
}

function showPanel(placeResult) {
    // If infoPane is already open, close it
    if (infoPane.classList.contains("open")) {
        infoPane.classList.remove("open");
    }

    // Clear the previous details
    while (infoPane.lastChild) {
        infoPane.removeChild(infoPane.lastChild);
    }

    // Display a photo in the info panel if there is one
    if (placeResult.photos != null) {
        const firstPhoto = placeResult.photos[0];
        const photo = document.createElement("img");
        photo.classList.add("hero");
        photo.src = firstPhoto.getUrl();
        infoPane.appendChild(photo);
    }

    // Add place details with text formatting
    const name = document.createElement("h1");
    name.classList.add("place");
    name.textContent = placeResult.name;
    infoPane.appendChild(name);
    if (placeResult.rating != null) {
        const rating = document.createElement("p");
        rating.classList.add("details");
        rating.textContent = `Rating: ${placeResult.rating} \u272e`;
        infoPane.appendChild(rating);
    }

    const address = document.createElement("p");
    address.classList.add("details");
    address.textContent = placeResult.formatted_address;
    infoPane.appendChild(address);
    if (placeResult.website) {
        const websitePara = document.createElement("p");
        const websiteLink = document.createElement("a");
        const websiteUrl = document.createTextNode(placeResult.website);
        websiteLink.appendChild(websiteUrl);
        websiteLink.title = placeResult.website;
        websiteLink.href = placeResult.website;
        websitePara.appendChild(websiteLink);
        infoPane.appendChild(websitePara);
    }
    // Open the infoPane
    infoPane.classList.add("open");
}

function showPanel(placeResult) {
    // If infoPane is already open, close it
    if (infoPane.classList.contains("open")) {
        infoPane.classList.remove("open");
    }

    // Clear the previous details
    while (infoPane.lastChild) {
        infoPane.removeChild(infoPane.lastChild);
    }

    // Display a photo in the info panel if there is one
    if (placeResult.photos !== null) {
        const firstPhoto = placeResult.photos[0];
        const photo = document.createElement("img");
        photo.classList.add("hero");
        photo.src = firstPhoto.getUrl();
        infoPane.appendChild(photo);
    }

    // Add place details with text formatting
    const name = document.createElement("h1");
    name.classList.add("place");
    name.textContent = placeResult.name;
    infoPane.appendChild(name);
    if (placeResult.rating != null) {
        const rating = document.createElement("p1");
        rating.classList.add("details");
        rating.textContent = `Rating: ${placeResult.rating} \u272e`;
        infoPane.appendChild(rating);
    }

    const address = document.createElement("p");
    address.classList.add("details");
    address.textContent = placeResult.formatted_address;
    infoPane.appendChild(address);
    if (placeResult.website) {
        const websitePara = document.createElement("p");
        const websiteLink = document.createElement("a");
        const websiteUrl = document.createTextNode(placeResult.website);
        websiteLink.appendChild(websiteUrl);
        websiteLink.title = placeResult.website;
        websiteLink.href = placeResult.website;
        websitePara.appendChild(websiteLink);
        infoPane.appendChild(websitePara);
    }
    // Open the infoPane
    infoPane.classList.add("open");
}

// book functionality
const url = window.location.search;
const bookId = url.split("=")[1];
getBook(bookId);

function getBook(bookId) {
    $.get("/api/search/" + bookId, (book) => {
        displayBook(book);
    });
}

function displayBook(book) {
    console.log(book);
    const bookResult = $("#book-result");
    bookResult.empty();
    const row = $("<div>");
    const column = $("<div>");
    const columnTwo = $("<div>");
    row.addClass("columns");
    column.addClass("column is-half");
    columnTwo.addClass("column is-one-third book-page");

    if (book.cover_link !== null && book.cover_link !== "") {
        column.append("<a class='float-right' href='/book?book_id=" + book.id + "'><img class='cover-img' src='" + book.cover_link + "' alt='book cover'></a>");
    }
    else {
        column.append("<a class='float-right' class='float-right'href='/book?book_id=" + book.id + "'><img src='https://via.placeholder.com/250'></a>");
    }
    columnTwo.append("<p class='title book-page'>" + book.title + "</p>");
    columnTwo.append("<p class='content book-page'>Author: " + book.author + "</p>");
    if (book.average_rating !== null) {
        columnTwo.append("<p class='content book-page'>Rating: " + book.average_rating + "</p>");
    }
    else {
        columnTwo.append("<p class='content book-page'>Rating: N/A</p>");
    }
    columnTwo.append("<p class='content book-page'>Number of Pages: " + book.number_of_pages + "</p>");
    columnTwo.append("<p class='content book-page'>Date Published: " + book.date_published + "</p>");
    columnTwo.append("<p class='content book-page'>Publisher: " + book.publisher + "</p>");
    columnTwo.append("<p class='content book-page'>Genre(s): " + book.genre + "</p>");
    columnTwo.append("<a href='" + book.amazon_link + "' target='__blank'>Buy Now!</a>");
    columnTwo.append("<p class='content book-page'>Description: " + book.description + "</p>");

    row.append(column);
    row.append(columnTwo);
    bookResult.append(row);
}


