adapt-hotspot-menu
==================

The hotspot menu consists of menu items contained within hotspots which are positioned on a image. When hotspots are selected menu item details are openened within a popup.

For mobile view by default this menu displays as the core box menu.

#### Example JSON
Configuration options are explained below.​ The "_hotspotMenuGraphic"  ​​should be set on the parent menu content object. 

````
{
    "_id":"co-30",
    "_parentId":"co-10",
    "_type":"menu",
    "_classes":"",
    "title":"Hotspot Menu",
    "displayTitle":"Hotspot Menu",
    "body":"Page description text.",
    "_graphic": {
        "alt": "alt text",
        "src": "course/en/images/hotgraphic.png"
    },
    "linkText":"View",
    "duration":"2 mins",
    "_hotspotMenuGraphic": {
        "alt": "alt text",
        "src": "course/en/images/hotgraphic.png"
    }
}
````

The "_hotspotMenuItem" should be set on the child​ content objects.

````
{
    "_id":"co-60",
    "_parentId":"co-30",
    "_type":"page",
    "_classes":"",
    "title":"Welcome to Adapt Learning",
    "displayTitle":"Welcome to Adapt Learning",
    "body":"Page description text.",
    "_lock" : [
        "co-05",
        "co-15",
        "co-20"
    ],
    "_graphic": {
        "alt": "alt text",
        "src": "course/en/images/origami-menu-one.jpg"
    },
    "linkText":"View",
    "duration":"2 mins",
    "_hotspotMenuItem": {
        "position": {
            "_top":50,
            "_left":50
        }
    }
}
````

#### Config options

Background Graphic
This provides the image src for the menu background image in which the hotspots are positioned to sit ontop of.

````
"_hotspotMenuGraphic": {
    "alt": "alt text",
    "src": "course/en/images/hotgraphic.png"
}
````

Hotspot Menu Item Position
This sets the top and left position of the menu item relative to its container. Positons are set as percentages.

````
"_hotspotMenuItem": {
    "position": {
        "_top":50,
        "_left":50
    }
}
````
