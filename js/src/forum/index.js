import { extend } from 'flarum/extend';
import TextEditor from 'flarum/components/TextEditor';
import Button from './components/Button';
import Toolbar from './components/Toolbar';

app.initializers.add('flarum-bbcode', function () {
  let index = 1;

  extend(TextEditor.prototype, 'init', function() {
    this.textareaId = 'textarea'+(index++);
  });

  extend(TextEditor.prototype, 'view', function(vdom) {
    vdom.children[0].attrs.id = this.textareaId;
  });

  extend(TextEditor.prototype, 'toolbarItems', function(items) {
    const tooltip = name => app.translator.trans(`flarum-bbcode.forum.composer.${name}_tooltip`);

    items.add('bbcode', (
      <Toolbar for={this.textareaId}>
        <Button title={tooltip('bold')} icon="fas fa-bold" style={{ prefix: '[b]', suffix: '[/b]]', trimFirst: true }} hotkey="b" />
        <Button title={tooltip('italic')} icon="fas fa-italic" style={{ prefix: '[i]', suffix: '[/i]', trimFirst: true }} hotkey="i" />
        <Button title={tooltip('quote')} icon="fas fa-quote-left" style={{ prefix: '[quote]', suffix: '[/quote]', multiline: true, surroundWithNewlines: true }} />
        <Button title={tooltip('code')} icon="fas fa-code" style={{ prefix: '[code]', suffix: '[/code]', multiline: true }} />
        <Button title={tooltip('link')} icon="fas fa-link" style={{ prefix: '[url=url]', suffix: '[/url]', replaceNext: 'url', scanFor: 'https?://' }} />
        <Button title={tooltip('image')} icon="fas fa-image" style={{ prefix: '[image=image]', suffix: '[/image]', replaceNext: 'image', scanFor: 'https?://' }} />
        <Button title={tooltip('unordered_list')} icon="fas fa-list-ul" style={{ prefix: '[ul][li]', suffix: '[/li][/ul]', multiline: true, surroundWithNewlines: true }} />
        <Button title={tooltip('ordered_list')} icon="fas fa-list-ol" style={{ prefix: '[ol][li]', suffix: '[/li][/ol]', multiline: true, orderedList: true, surroundWithNewlines: true }} />
      </Toolbar>
    ), 100);
  });
});
