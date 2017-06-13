"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Hero = (function () {
    function Hero() {
    }
    return Hero;
}());
exports.Hero = Hero;
var TopNav = (function () {
    function TopNav() {
        this.title = 'Tour of Heroes';
        this.hero = {
            id: 1,
            name: 'Windstorm'
        };
    }
    return TopNav;
}());
TopNav = __decorate([
    core_1.Component({
        selector: 'top-nav',
        template: "\n    <div class=\"ui fixed inverted menu\">\n    <div class=\"ui container\">\n      <a href=\"#\" class=\"header item\">\n        <img class=\"logo\" src=\"assets/images/logo.png\">\n        Project Name\n      </a>\n      <a href=\"#\" class=\"item\">Home</a>\n      <div class=\"ui simple dropdown item\">\n        Dropdown <i class=\"dropdown icon\"></i>\n        <div class=\"menu\">\n          <a class=\"item\" href=\"#\">Link Item</a>\n          <a class=\"item\" href=\"#\">Link Item</a>\n          <div class=\"divider\"></div>\n          <div class=\"header\">Header Item</div>\n          <div class=\"item\">\n            <i class=\"dropdown icon\"></i>\n            Sub Menu\n            <div class=\"menu\">\n              <a class=\"item\" href=\"#\">Link Item</a>\n              <a class=\"item\" href=\"#\">Link Item</a>\n            </div>\n          </div>\n          <a class=\"item\" href=\"#\">Link Item</a>\n        </div>\n      </div>\n    </div>\n  </div>\n    "
    })
], TopNav);
exports.TopNav = TopNav;
//# sourceMappingURL=app.top-nav.js.map