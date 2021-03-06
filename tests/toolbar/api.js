(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    module("Toolbar: API: ", {
        setup: function() {
            kendo.effects.disable();
            container = $("<div id='toolbar' />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
            }
        }
    });

    test("remove method removes a button", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        }).data("kendoToolBar");

        toolbar.remove("#foo");

        equal(toolbar.element.find("#foo").length, 0, "Button is removed from the toolbar");
        equal(toolbar.popup.element.children("li").length, 0, "Button is removed from the overflow container");
    });

    test("remove method removes buttonGroup", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                ] }
            ]
       }).data("kendoToolBar");

       toolbar.remove(toolbar.element.find(".k-button-group").first());

       equal(toolbar.element.find(".k-button-group").length, 0, "ButtonGroup is removed from the toolbar");
       equal(toolbar.popup.element.find(".k-button-group").length, 0, "ButtonGroup is removed from the overflow container");
    });

    test("remove method removes splitButton", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
       }).data("kendoToolBar");

       toolbar.remove($("#splitButton_wrapper"));

       equal(toolbar.element.find(".k-split-button").length, 0, "SplitButton is removed from the toolbar");
       equal(toolbar.popup.element.find(".k-split-button").length, 0, "SplitButton is removed from the overflow container");
    });

    test("remove method removes splitButton by the ID of its main button", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
       }).data("kendoToolBar");

       toolbar.remove($("#splitButton"));

       equal(toolbar.element.find(".k-split-button").length, 0, "SplitButton is removed from the toolbar");
       equal(toolbar.popup.element.find(".k-split-button").length, 0, "SplitButton is removed from the overflow container");
    });

    test("remove method removes separator", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "separator" }
            ]
       }).data("kendoToolBar");

       toolbar.remove(toolbar.element.find(".k-separator"));

        equal(toolbar.element.find(".k-separator").length, 0, "Separator is removed from the toolbar");
        equal(toolbar.popup.element.find(".k-separator").length, 0, "Separator is removed from the overflow container");
    });

    test("enable method enables button", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", enable: false }
            ]
        }).data("kendoToolBar");

        toolbar.enable("#foo");
        
        ok(!$("#foo").hasClass("k-state-disabled"), "Toolbar button does not have k-state-disabled class");
        ok(!toolbar.popup.element.children().first().hasClass("k-state-disabled"), "Overflow button does not have k-state-disabled class");
    });

    test("enable method disables button", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", enable: true }
            ]
        }).data("kendoToolBar");

        toolbar.enable("#foo", false);
        
        ok($("#foo").hasClass("k-state-disabled"), "Toolbar button have k-state-disabled class");
        ok(toolbar.popup.element.children().first().hasClass("k-state-disabled"), "Overflow button have k-state-disabled class");
    });

    test("get selected item from group returns the selected toggle button", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", togglable: true, group: "foo" },
                { type: "button", id: "bar", text: "bar", togglable: true, group: "foo", selected: true },
                { type: "button", id: "baz", text: "baz", togglable: true, group: "foo" }
            ]
        }).data("kendoToolBar");

        var selected = toolbar.getSelectedFromGroup("foo");

        equal(selected.attr("id"), "bar");
    });

    test("Chanding the toggle state of a button is propagated to the twin element located in the command overflow popup", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", togglable: true }
            ]
        }).data("kendoToolBar");

        toolbar.toggle("#foo");
        ok($("#foo").hasClass("k-state-active"));
        ok($("#foo_overflow").hasClass("k-state-active"));
    });

    test("Chanding the toggle state of an overflow button is propagated to the twin element located in the toolbar wrapper", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", togglable: true }
            ]
        }).data("kendoToolBar");

        toolbar.toggle("#foo_overflow");
        ok($("#foo").hasClass("k-state-active"));
        ok($("#foo_overflow").hasClass("k-state-active"));
    });

})();
