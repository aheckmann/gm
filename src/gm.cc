
#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <Magick++.h>

using namespace v8;
using namespace node;
using namespace Magick;

Handle<Value> gm (const Arguments& args) {
  HandleScope scope;
  return scope.Close(String::New("Hello gm"));
}

void init (Handle<Object> exports, Handle<Object> module) {
  InitializeMagick(NULL);

  // set module.exports to gm
  NODE_SET_METHOD(module, "exports", gm);
}

NODE_MODULE(gm, init);
