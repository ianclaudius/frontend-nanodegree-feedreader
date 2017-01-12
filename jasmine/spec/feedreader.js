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

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('all have defined, non-empty URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        it('all have defined, non-empty names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });

    describe('The menu', function() {

        var body = $('body');

        it('element is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        var menuIcon = $('.menu-icon-link');

        it('changes visibility when the menu icon is clicked', function() {
            // Note: tried to use beforeEach with the clicks here but didn't work, need to investigate at some point

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has at least a single entry element', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {

        var feed = $('.feed');
        var feedA;
        var feedB;

        // First storing each feed's content in a separate variable
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedA = feed.html();
                loadFeed(1, function() {
                    feedB = feed.html();
                    done();
                });
            });
        });

        // Then comparing those variables to see if they're different, since that means the content has changed
        it('updates the content', function(done) {
            expect(feedA).not.toEqual(feedB);
            done();
        });
    });
}());
