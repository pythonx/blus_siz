import scrapy
import json
import re

class QuotesSpider(scrapy.Spider):
    name = "quotes"

    def start_requests(self):
        urls = [
        'https://www.etsy.com/in-en/search?q=plus+size+african+dresses&ref=pagination&page=1'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        #print("start response eeeeeeeeeeeeeeeeeeeeeeee");
        #print(response.css("div.quote"));
        #print("end response eeeeeeeeeeeeeeeeeeeeeeee");
        idarr = [];
        testarr = [1,2,3];
        prodarr = [];
        page = response.url.split("/")[-2]
        filename = 'quotes2-%s.txt' % page
        with open(filename, 'wb') as f:
            for item in response.css("li.block-grid-item"):
                item_link = item.css('a.listing-link::attr(href)').extract()[0];
                item_title = item.css('a.listing-link::attr(title)').extract()[0];
                item_id = item.css('a.listing-link::attr(data-listing-id)').extract()[0];
                item_rating = item.css('input[name=initial-rating]::attr(value)').extract()[0];
                item_price = item.css('span.currency-value::text').extract()[0];
                item_img = item.css('img::attr(src)').extract()[0];
                item_seller = item.xpath('.//div[@class="v2-listing-card__shop"]/p/text()').extract()[0];
                diction = dict(link = item_link, title = item_title, id = item_id, img = item_img, rating = item_rating, price = item_price, seller = item_seller);
                
                if (item_id not in idarr):
                    match = re.search('plus', item_title, re.M|re.I);
                    match2 = re.search('african', item_title, re.M|re.I);
                    match3 = re.search('dress', item_title, re.M|re.I);
                    if(match and match2 and match3):

                        idarr.append(item_id);
                        prodarr.append(diction);
                

                # f.write(item_link+ '\n');
                # f.write(item_id+ '\n');
                # f.write(item_title+ '\n');
                # f.write(item_img+ '\n');
                # f.write(str(diction));
                # f.write('\n');
            json.dump(prodarr, f);
        self.log('Saved file %s' % filename)