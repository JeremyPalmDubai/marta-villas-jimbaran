"""Reproducible local technical SEO checks, not a Lighthouse or ranking score."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1];dist=root/'dist';base='https://marta-villas-jimbaran.com';langs=['en','fr','nl','de','es','pt']
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.nodes=[];self.current=None;self.titles=[];self.schemas=[];self.feed(text)
 def handle_starttag(self,t,a):
  d=dict(a);self.nodes.append((t,d));
  if t=='title':self.current='title'
  if t=='script' and d.get('type')=='application/ld+json':self.current='schema'
 def handle_endtag(self,t):
  if t in ('title','script'):self.current=None
 def handle_data(self,d):
  if self.current=='title':self.titles.append(d)
  if self.current=='schema':self.schemas.extend(json.loads(d))
 def find(self,t,**attrs):return [a for tag,a in self.nodes if tag==t and all(a.get(k)==v for k,v in attrs.items())]
results=[];titles=[];descriptions=[]
for lang in langs:
 file=dist/('index.html' if lang=='en' else lang+'/index.html');text=file.read_text();p=Page(text);url=base+('/' if lang=='en' else '/'+lang+'/');checks={}
 checks['html_language']=p.find('html',lang=lang)!=[]
 checks['single_h1']=len(p.find('h1'))==1
 checks['unique_nonempty_title']=len(p.titles)==1 and bool(p.titles[0].strip()) and p.titles[0] not in titles;titles+=p.titles
 desc=p.find('meta',name='description');checks['unique_description']=len(desc)==1 and 80<=len(desc[0].get('content',''))<=200 and desc[0]['content'] not in descriptions;descriptions+=[d['content'] for d in desc]
 checks['canonical']=p.find('link',rel='canonical',href=url)!=[]
 checks['hreflang_reciprocal']=all(p.find('link',rel='alternate',hreflang=l,href=base+('/' if l=='en' else '/'+l+'/')) for l in langs) and bool(p.find('link',hreflang='x-default',href=base+'/'))
 checks['indexable']='noindex' not in p.find('meta',name='robots')[0]['content']
 checks['mobile_viewport']=bool(p.find('meta',name='viewport'))
 checks['social_metadata']=all(p.find('meta',property=k) for k in ['og:title','og:description','og:image','og:url','og:type']) and bool(p.find('meta',name='twitter:card'))
 checks['structured_data']=set(['WebSite','Accommodation','FAQPage','Organization']).issubset({s['@type'] for s in p.schemas})
 checks['faq_matches_visible']=all(q['name'] in text and q['acceptedAnswer']['text'] in text for s in p.schemas if s['@type']=='FAQPage' for q in s['mainEntity'])
 checks['image_alternatives']=all('alt' in a for a in p.find('img'))
 checks['image_dimensions']=all('width' in a and 'height' in a for a in p.find('img') if a.get('src'))
 ids=[a['id'] for _,a in p.nodes if 'id' in a];checks['unique_ids']=len(ids)==len(set(ids))
 checks['anchor_targets']=all(a['href'][1:] in ids for a in p.find('a') if a.get('href','').startswith('#'))
 paths=[]
 for tag,a in p.nodes:
  for attr in (['href'] if tag=='a' or tag=='link' else ['src','poster','data-src']):
   v=a.get(attr,'');u=urlsplit(v)
   if v and not u.scheme and not v.startswith('#') and u.path:paths.append(file.parent/unquote(u.path))
 checks['local_resources_exist']=all(path.exists() for path in paths)
 checks['crawlable_links']=all(bool(a.get('href')) and not a['href'].startswith('javascript:') for a in p.find('a'))
 checks['correct_contact']=bool(p.find('a',href='https://palmsignature.ae')) and 'Gabriella Magalhaes' in text and 'wa.me/971582474950?text=' in text
 checks['current_price_only']='225' in text and not any(v in text for v in ['250,000','250.000','250 000','Ernesto','61406561180'])
 checks['static_content']=len(text)>10000 and len(p.find('h2'))>=10
 results.append({'language':lang,'checks':checks,'passed':sum(checks.values()),'total':len(checks)})
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9','x':'http://www.w3.org/1999/xhtml'};tree=ET.parse(dist/'sitemap.xml');urls=tree.findall('s:url',ns)
global_checks={'sitemap_six_canonical_urls':set(u.find('s:loc',ns).text for u in urls)==set(base+('/' if l=='en' else '/'+l+'/') for l in langs),'sitemap_all_alternates':all(len(u.findall('x:link',ns))==7 for u in urls),'robots_sitemap':f'Sitemap: {base}/sitemap.xml' in (dist/'robots.txt').read_text(),'custom_domain':(dist/'CNAME').read_text().strip()=='marta-villas-jimbaran.com','english_redirect_noindex':'noindex' in (dist/'en/index.html').read_text(),'custom_404_noindex':'noindex' in (dist/'404.html').read_text()}
report={'scope':'Local technical SEO checks. Not Lighthouse, Google rankings, live HTTP, or indexation certification.','pages':results,'global':global_checks}
(root/'audit/seo.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
raise SystemExit(0 if all(all(p['checks'].values()) for p in results) and all(global_checks.values()) else 1)
