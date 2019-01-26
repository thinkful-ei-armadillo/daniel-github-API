/* global $ */
'use strict';

const base_url = 'https://api.github.com/users/';

// github repo JSON for users comes from /users/[USERNAME]/repos

// use JSON to create HTML results list
function showResults(responseJson) {
  console.log(responseJson);

  $('.js-results').empty();

  for ( let i = 0; i < responseJson.length; i++ ) {
    $('.js-results').append(
      `<div class="results-wrapper">
        <h3 for="repo name">${responseJson[i].name}</h3>
        <p for="repo description">${responseJson[i].description}</p>
        <p for="repo link"><a href=${responseJson[i].html_url}>${responseJson[i].html_url}</a></p>
      </div>`
    );
  }
}

// fetch proper api link to get the JSON we need
function getRepos(search) {

  const searchUrl = base_url + search + '/repos';
  console.log(`Search url is ${searchUrl}`);

  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then( responseJson => showResults(responseJson) )
    .catch(err => {
      $('.js-status-message').html(`<p>Something went wrong: ${err.message}`);
    });
}

// listen to the form so we can pull the user's text input
// to search the api and return appropriate results
function formListener() {
  $('.js-github-search').submit( function(event) {
    event.preventDefault();
    const searchTerm = $('.js-github-handle-input').val();
    console.log(`User's search term is ${searchTerm}`);
    getRepos(searchTerm);
  });
}

$(formListener);