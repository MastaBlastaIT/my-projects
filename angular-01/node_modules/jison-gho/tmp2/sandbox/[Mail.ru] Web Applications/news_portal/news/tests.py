from django.test import TestCase
from django.utils import timezone
from django.core.urlresolvers import reverse
from .models import Article
from django.contrib.auth.models import User


def create_article(days, author, title="Test article",text="Test text"):
    """
    Creates an article with the given `title` and `text` published the given
    number of `days` offset to now (negative for articles published in the past)
    """
    date = timezone.now() + timezone.timedelta(days=days)
    return Article.objects.create(author=author, title=title, text=text, pub_date=date)

class ArticleViewTests(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='test', password='test12345')

    def tearDown(self):
        pass

    def test_list_view_with_no_articles(self):
        """
        If no articles exist, an appropriate message should be displayed.
        """
        response = self.client.get(reverse('news:list'))
        self.assertEqual(response.status_code, 200)
        self.assertIn("No articles available", str(response.content, encoding='utf-8'))
        self.assertQuerysetEqual(response.context['object_list'], [])

    def test_list_view_with_a_past_article(self):
        """
        Articles with pub_date in past should be displayed on the index page.
        """
        self.client.login(username='test', password='test12345')
        expected = create_article(days=-30, author=User.objects.get(username='test'), title="Past article", text="Past article's text")
        response = self.client.get(reverse('news:list'))
        self.assertQuerysetEqual(response.context['object_list'], ['<Article: '+str(expected)+'>',])

    def test_list_view_with_a_future_article(self):
        """
        Articles with pub_date in future should not be displayed on the index page.
        """
        expected = create_article(days=30, author=User.objects.get(username='test'), title="Past article", text="Past article's text")
        response = self.client.get(reverse('news:list'))
        self.assertContains(response, 'No articles available', status_code=200)  # combined contains
        self.assertQuerysetEqual(response.context['object_list'], [])
