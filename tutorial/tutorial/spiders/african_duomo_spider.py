import scrapy
import json
import re
import urllib
from PIL import Image
from resizeimage import resizeimage

i = 0;
idarr = [];
prodarr = [];
class QuotesSpider(scrapy.Spider):
    name = "tribeduomo"

    def start_requests(self):
        user_agent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1"
        urls = [
        'https://www.tribeofdumo.com/plus-sizes'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        global i

        print("start response");
        #print response.body
        print response.xpath('/html/body/gallery/div/div/div/products-container/section/ul/li[2]/product-item/a')
        #print response.css("li.gallery-item");
        #print(response.css("div.quote"));
        #print("end response eeeeeeeeeeeeeeeeeeeeeeee");
        
        testarr = [1,2,3];
        #prodarr = [];
        page = response.url.split("/")[-2]
        filename = 'tribeduomo-%s.txt' % page
        with open(filename, 'wb') as f:
            f.write(response.body)
        for item in response.css("a.product-item"):
            print"item"
            i+=1
            if(i>=7):
                break
                #print"bread"

            item_link = item.xpath('.//@href').extract()[0];
            item_title = item.xpath('.//div[@class="product-details"]/h3/tect()').extract()[0];
            item_img = item.xpath('.//div[@class="product-media"]/div[@data-hook="image-link"]/product-image/img/@ng-src').extract()[0];
            item_price = item.xpath('.//span[@class="price"]/span[@data-hook="price"]/text()').extract()[0];
            print "start"
            print item_link
            print item_title
            print item_img
            print item_price
            print "end"

            #item_id = item.css('a.listing-link::attr(data-listing-id)').extract()[0];
            # if(item.css('input[name=initial-rating]::attr(value)')):
            #     item_rating = item.css('input[name=initial-rating]::attr(value)').extract()[0];    
            # else:
            #     item_rating = '0'
            
            
            # item_seller = item.xpath('.//div[@class="v2-listing-card__shop"]/p/text()').extract()[0];
            # # print"response headers start"
            # # print response.headers;
            # # print"response headers end"
            # match = re.search('plus', item_title), re.M|re.I);
            # match2 = re.search('african', item_title, re.M|re.I);
            # match3 = re.search('dress', item_title, re.M|re.I);
            # if(match and match2 and match3):
            #     #yield scrapy.Request(item_link, callback=self.imgparse, meta = {'item_link': item_link, 'item_title': item_title, 'item_id': item_id, 'item_rating': item_rating, 'item_price': item_price,'item_seller': item_seller, 'filename': filename })
            # print("woooooooooooooooh")
                # diction = dict(link = item_link, title = item_title, id = item_id, img = item_img, rating = item_rating, price = item_price, seller = item_seller);
                # print("wooooot");
                # if (item_id not in idarr):
                #     match = re.search('plus', item_title, re.M|re.I);
                #     match2 = re.search('african', item_title, re.M|re.I);
                #     match3 = re.search('dress', item_title, re.M|re.I);
                #     if(match and match2 and match3):

                #         idarr.append(item_id);
                #         prodarr.append(diction);
                

                # f.write(item_link+ '\n');
                # f.write(item_id+ '\n');
                # f.write(item_title+ '\n');
                # f.write(item_img+ '\n');
                # f.write(str(diction));
                # f.write('\n');
        #     json.dump(prodarr, f);
        # self.log('Saved file %s' % filename)

    def imgparse(self, response):
        handmade = False
        print("yeeeeeeeeeeehhhhhhaaaaaaaaaaaaaaaaa");
        global idarr
        global prodarr
        #item_img = "http://"
        item_img = response.xpath('.//li[@id = "image-0"]/img/@src').extract()[0]
        item_sizes = response.xpath('.//select[@id = "inventory-variation-select-0"]/option[not(@disabled)]/text()').extract()
        itemovr = response.xpath('.//ul[@id = "item-overview"]/li/text()').extract()[0]
        imgname = item_img.split('/')[-1]
        img_local = './images/africandresses/'+imgname
        img_resized = './images/africandresses/resizes/200-width'+imgname
        urllib.urlretrieve(item_img,'../../../plus_size/images/africandresses/'+imgname );
        with open('../../../plus_size/images/africandresses/'+imgname, 'r+b') as f:
            with Image.open(f) as image:
                cover = resizeimage.resize_width(image, 200)
                cover.save('../../../plus_size/images/africandresses/resizes/200-width'+imgname, image.format)

                print itemovr + "this is itemovr"
                # print str.lower(itemovr.encode('ascii'))
        if(re.search("handmade", str.lower(itemovr.encode('ascii')))):
            handmade = True
            print "handmade is trueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"


        if(len(item_sizes) > 0):
            item_sizes.pop(0);

        
        diction = dict(link = response.meta.get('item_link'), title = response.meta.get('item_title'), id = response.meta.get('item_id'), img = item_img, rating = response.meta.get('item_rating'), price = response.meta.get('item_price'), seller = response.meta.get('item_seller'), sizes = item_sizes, handmade =  handmade, img_local = img_local, img_resized = img_resized, website = 'etsy');
        print response.meta
        print diction
        #print("wooooot");
        if (response.meta.get('item_id') not in idarr):
            match = re.search('plus', response.meta.get('item_title'), re.M|re.I);
            match2 = re.search('african', response.meta.get('item_title'), re.M|re.I);
            match3 = re.search('dress', response.meta.get('item_title'), re.M|re.I);
            if(match and match2 and match3):

                idarr.append(response.meta.get('item_id'));
                prodarr.append(diction);
               # print(prodarr)

        
        with open(response.meta.get('filename'), 'wb') as f:
            json.dump(prodarr, f);
        