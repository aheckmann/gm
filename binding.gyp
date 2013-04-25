{
  "targets": [
    {
      "target_name": "gm",
      "sources": [ "src/gm.cc" ],
      "link_settings": {
        "libraries": [
          "<!@(GraphicsMagick++-config --cppflags --cxxflags --ldflags --libs)"
        ]
      },
      "conditions": [
        ['OS=="mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'OTHER_CFLAGS': [
              '<!@(GraphicsMagick++-config --cppflags --cxxflags --ldflags)'
            ]
          }
        }, {
          'cflags': [
            '<!@(GraphicsMagick++-config --cflags --cppflags)'
          ],
        }]
      ]
    }
  ]
}
