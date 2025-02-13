import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HelloWorld from '../hello-world.vue';


describe("HelloWorld", () => {
  it("Renders the Hello world message with props", async () => {
  
    const wrapper = mount(HelloWorld, {
      props: {
        msg: "My message"
      },
      global: {
        mocks: {
          $t: (msg: string) => msg
        }
      },
    })
    
    expect(wrapper.text()).toContain("welcome_msg")
  })
});

