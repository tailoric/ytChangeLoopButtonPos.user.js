// ==UserScript==
// @name         Loop button position changer
// @namespace    tailoric.youtube.user
// @version      1.1.1
// @description  puts the button for the loop option in the right click menu on the 3rd item
// @author       tailoric
// @include      https://www.youtube.com/*
// @include      https://youtu.be/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var event = new Event("positionChanged")
    /**
     * a small helper function that gets the youtube context menu element from the records
     */
    function getContextMenu(mutationRecords){
        for (let record of mutationRecords){
            for (let addedNode of record.addedNodes){
                if (addedNode.className === "ytp-popup ytp-contextmenu"){
                    return addedNode;
                }
            }
        };
    }
    /* create an mutationObserver which will change the position of the loop button */
    var observer = new MutationObserver(mutationRecords => {
        var contextMenu = getContextMenu(mutationRecords);
        if(!contextMenu){
            return;
        }
        /* the loop button is the first item so just select the first element in the context menu */
        let loopButton = contextMenu.querySelector(".ytp-menuitem");
        if(loopButton){
            let panelMenu = loopButton.parentNode;
            panelMenu.insertBefore(loopButton, panelMenu.children[3]);
            document.dispatchEvent(event);

        }
    });
    /* after changing the position we don't need to listen to changes anymore */
    document.addEventListener("positionChanged", () => observer.disconnect())
    observer.observe(document.body, {childList: true});
})();
