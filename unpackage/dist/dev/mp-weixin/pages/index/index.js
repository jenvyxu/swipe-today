"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const start = common_vendor.ref({ x: 0, y: 0 });
    let date = /* @__PURE__ */ new Date();
    let a = date.getDate();
    let clientX = 0;
    let clientY = 0;
    const buttons = common_vendor.ref([{ label: "浪费", id: "bad" }, { label: "还不错", id: "ok" }, { label: "非常好", id: "nice" }]);
    const creareCard = () => {
      const day = (/* @__PURE__ */ new Date()).getDate();
      return {
        label: date.getDate(),
        id: `card-${day}`,
        style: {},
        class: "card ok"
      };
    };
    const cards = common_vendor.ref([creareCard()]);
    const handleTouch = (e) => {
      const touchData = e.touches[0];
      clientX = touchData.clientX;
      clientY = touchData.clientY;
    };
    const onTouchMove = (e) => {
      const { clientX: newClientX, clientY: newClientY } = e.touches[0];
      const offsetX = newClientX - clientX;
      const offsetY = newClientY - clientY;
      const rotate = offsetX * 0.1;
      cards.value[0].style = { transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)` };
      if (Math.abs(offsetX) > 100) {
        dismiss(offsetX > 0 ? 1 : -1, offsetY);
      }
    };
    const dismiss = (direction, offsetY) => {
      let { windowWidth } = common_vendor.index.getWindowInfo();
      start.value = {};
      cards.value[0].style = {
        transition: "transform 1s",
        transform: `translate(${direction * windowWidth * 10}rpx, ${offsetY}rpx) rotate(${90 * direction}deg)`
      };
    };
    const onTouchEnd = () => {
      cards.value.pop();
      ++a;
      setTimeout(() => {
        cards.value.unshift({
          id: `card-${a}`,
          label: a,
          style: {},
          class: "card ok"
        });
      }, 500);
    };
    const handleClick = (id) => {
      cards.value[cards.value.length - 1].class = `card ${id}`;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(cards.value, (card, k0, i0) => {
          return {
            a: common_vendor.t(card.label),
            b: common_vendor.n(card.class),
            c: card.id,
            d: common_vendor.o(handleTouch, card.id),
            e: common_vendor.s(card.style),
            f: common_vendor.o(onTouchMove, card.id),
            g: common_vendor.o(onTouchEnd, card.id)
          };
        }),
        b: common_vendor.f(buttons.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item.id,
            c: common_vendor.o(() => handleClick(item.id), item.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/xzw/Documents/HBuilderProjects/swipe-today/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
