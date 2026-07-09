---
layout: page
title: map
permalink: /travel-map/
description: Travel notes by place.
nav: true
nav_order: 2
map: true
_styles: |
  #travel-map {
    position: relative;
    width: 100%;
    max-width: 100%;
    height: 420px;
    min-height: 320px;
    max-height: 55vh;
    margin: 0 0 1.5rem;
    overflow: hidden;
    border: 1px solid var(--global-divider-color);
    border-radius: 6px;
    z-index: 0;
  }

  #travel-map.leaflet-container {
    overflow: hidden;
    z-index: 0;
  }

    #travel-map .leaflet-pane,
    #travel-map .leaflet-tile,
    #travel-map .leaflet-marker-icon,
    #travel-map .leaflet-marker-shadow,
    #travel-map .leaflet-tile-container,
    #travel-map .leaflet-pane > svg,
    #travel-map .leaflet-pane > canvas,
    #travel-map .leaflet-zoom-box,
    #travel-map .leaflet-image-layer,
    #travel-map .leaflet-layer {
      position: absolute;
      left: 0;
      top: 0;
    }

    #travel-map .leaflet-tile,
    #travel-map .leaflet-marker-icon,
    #travel-map .leaflet-marker-shadow {
      user-select: none;
      -webkit-user-drag: none;
    }

    #travel-map .leaflet-tile {
      max-width: none !important;
    }

    #travel-map .leaflet-tile-container {
      width: 256px;
      height: 256px;
    }

    #travel-map .leaflet-pane,
    #travel-map .leaflet-top,
    #travel-map .leaflet-bottom {
      z-index: 1;
    }

    #travel-map .leaflet-control {
      z-index: 2;
    }


  #travel-map .travel-map-pin {
    position: relative;
    width: 30px;
    height: 30px;
    border: 0;
    background: transparent;
  }

  #travel-map .travel-map-pin::before {
    position: absolute;
    top: 1px;
    left: 6px;
    width: 18px;
    height: 18px;
    content: "";
    transform: rotate(45deg);
    border: 2px solid #ffffff;
    border-radius: 50% 50% 50% 0;
    background: var(--global-theme-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28);
  }

  #travel-map .travel-map-pin::after {
    position: absolute;
    top: 7px;
    left: 12px;
    width: 6px;
    height: 6px;
    content: "";
    border-radius: 50%;
    background: #ffffff;
  }

  #travel-map .leaflet-popup-content-wrapper,
  #travel-map .leaflet-popup-tip {
    color: var(--global-text-color);
    background: var(--global-bg-color);
    border: 1px solid var(--global-divider-color);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  }

  #travel-map .leaflet-popup-content-wrapper {
    border-radius: 6px;
  }

  #travel-map .leaflet-popup-content {
    margin: 0.8rem 0.95rem;
  }

  #travel-map .leaflet-container a.leaflet-popup-close-button {
    color: var(--global-text-color-light);
  }

  #travel-map .leaflet-container a.leaflet-popup-close-button:hover {
    color: var(--global-theme-color);
  }

  @media (max-width: 576px) {
    #travel-map {
      height: 340px;
      min-height: 280px;
      max-height: 52vh;
    }
  }
---

{% assign travel_posts = site.posts | where_exp: "post", "post.travel_map and post.travel_map.lat and post.travel_map.lng" %}

<div id="travel-map" class="map travel-map" aria-label="Travel map"></div>

<script type="application/json" id="travel-map-data">
[
{% for post in travel_posts %}
  {
    "title": {{ post.title | jsonify }},
    "description": {{ post.description | default: "" | jsonify }},
    "place": {{ post.travel_map.place | default: post.title | jsonify }},
    "lat": {{ post.travel_map.lat | jsonify }},
    "lng": {{ post.travel_map.lng | jsonify }},
    "url": {{ post.url | relative_url | jsonify }},
    "date": {{ post.date | date: "%Y-%m-%d" | jsonify }}
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
]
</script>

{% if travel_posts.size == 0 %}
  <p>No pinned travel notes yet.</p>
{% endif %}
