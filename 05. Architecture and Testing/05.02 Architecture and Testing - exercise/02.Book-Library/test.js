const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const options = { headless: false, slowMo: 200 };
const url = 'http://127.0.0.1:5500/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/02.Book-Library/index.html';

const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0":
    {"author":"J.K.Rowling","title":"Harry Potter and the Philosopher's Stone"},
    "d953e5fb-a585-4d6b-92d3-ee90697398a1":{"author":"Svetlin Nakov","title":"C# Fundamentals"}};
describe('Test', function () {

    let browser, page;
    this.timeout(6000);

    before(async () => browser = await chromium.launch(options));
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await browser.close());
    after(async () => await browser.close());

    it('Testing: load books', async function () {

        await page.route('**/jsonstore/collections/books', (route, request) => {
            route.fulfill({
                body: JSON.stringify(mockData),
                status:200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
        })
        //navigate to page
        await page.goto(url);
        // await page.screenshot({ path: `example.png` });
        
        //find and click the load btn

        await page.click("text = load all books");
        await page.waitForSelector("text=Harry Potter");

        //check if all books are displayed

        const rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));
        console.log(rowData);

        expect(rowData[0]).to.contains('Harry Potter');
        expect(rowData[0]).to.contains('Rowling');
        expect(rowData[1]).to.contains('C# Fundamentals');
        expect(rowData[1]).to.contains('Nakov');
    });


    it('Testing: add book', async function () {

        //navigate to page
        await page.goto(url);
        //find form
        //fill input fields
        await page.fill('input[name=title]', 'New Book');
        await page.fill('input[name=author]', 'Author');

        //click Submit
        const [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('text=Submit')
        ]);

        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('New Book');
        expect(data.author).to.equal('Author');

    });
})
