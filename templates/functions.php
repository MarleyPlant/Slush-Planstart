<?php
function <%= appNameSlug %>_load_js(){ //Load the Js Librararies needed
<% if(includeBootstrap) { %>
  wp_register_script( 'bootstrap', get_template_directory_uri() . '/assets/bootstrap-min.js'); //Load generated Bootstrap_JS
  wp_enqueue_script( 'bootstrap' ); //Add bootstrap_JS to header
<% } %>
}

function <%= appNameSlug %>_load_css(){
<% if(includeBootstrap) { %>
  wp_register_style('bootstrap', get_template_directory_uri() . '/assets/bootstrap.css'); //Load generated bootstrap
  wp_enqueue_style('bootstrap'); //Add bootstrap to header
<% } %>

<% if(includeMDBootstrap) { %>
  wp_register_style( 'mdbootstrap', get_template_directory_uri() . '/assets/mdb.css'); //Load MDBootstrap Library
  wp_enqueue_style('mdbootstrap');
<% } %>
}
add_action( 'wp_enqueue_scripts', '<%= appNameSlug %>_load_css'); //Load the CSS Libraries into the header.
add_action( 'wp_enqueue_scripts', '<%= appNameSlug %>_load_js' ); //Load the JS Libraries into the header.
?>
