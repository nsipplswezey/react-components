module.exports = {
  sequence1 : {
    first : true,
    videoData : [

      {source : "EarthSlowNosun",
       type : "video",
       caption : [
          {type : "headline",
           headlineText : "Scrolling To Navigate With React",
           summaryText : "This react component tastefully modifies the state of images and video to allow natural story telling flow integrated with text."}
        ]
      },

      {source : "EarthSlowSun",
       type : "video",
       caption : [
        {type : "right",
         captionText : "Information text can be placed left, right and center of the underlying content. The fading transitions are especially useful for 1-to-1 change comparisons."
        }
        ]
      },

      {source : "http://nsipplswezey.github.io/turn21-valleyfire/assets/trueColor.jpg",
       type : "image",
       caption : [
         {type : "center",
         captionText : "Compare this true color image of the area burned by the valley fire."}
       ]
     },

      {source : "http://nsipplswezey.github.io/turn21-valleyfire/assets/infraColor.jpg",
       type : "image",
       caption : [
         {type : "center",
          captionText : "This this false color image highlighting burn scars. Don't be afraid to scroll back and forth to explore specific details, like the burn scars in downtown Middletown."},
            ]
        },

        {source : "http://nsipplswezey.github.io/turn21-jakobshavn/assets/720/jakobshavn-GE-precalving.jpg",
         type : "image",
         caption : [
           {type : "long",
            captionText : "Long formatted text is intended to allow for extended narration of the subject matter. You're looking at the Jakobshavn glacier, one of the fastest melting glaciers in greenland. This is transition shows one of the largest recorded glacial calving events in human history. The volume of ice lost between these two images was many times larger than the surface mass of Manhattan."},
              ]
          },

          {source : "http://nsipplswezey.github.io/turn21-jakobshavn/assets/720/jakobshavn-GE-postcalving.jpg",
           type : "image",
           caption : [
             {type : "right",
              captionText : "There it goes!"},
                ]
            }
    ]
  }
};
