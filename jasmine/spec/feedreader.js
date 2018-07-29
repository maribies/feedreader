/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has a URL', function(){
           for (let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has defined name', function(){
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });

    describe('The menu', function() {

        /* This is a test that ensures the menu element is
         * hidden by default.
         */
         it('menu is hidden by default', function(){
           expect($('body').hasClass("menu-hidden")).toBe(true);
         })

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('hamburger menu toggles when clicked', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

      describe('Initial Entries', function() {

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done){
          loadFeed(0, done);
        });

        it('loadFeed is called and complete with single entry in feed container', function(done){
          expect($('.feed .entry-link').length > 0).toBe(true);
          done();
        });

      });


        /* This is a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
        */
      describe('New Feed Selection', function() {
        let feedAfterFirstLoad,
            feedAfterSecondLoad;

        beforeEach(function(done){
          loadFeed(0, function (){
              feedAfterFirstLoad = $('.feed').html();
            loadFeed(1, function (){
              feedAfterSecondLoad = $('.feed').html();
              done();
            })
          })

        });

        it('new feed content changes', function(done) {
          expect(feedAfterFirstLoad).not.toEqual(feedAfterSecondLoad);
          done();
        });
      });
}());
