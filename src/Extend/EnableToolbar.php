<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Bbcode\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extend\Frontend;
use Flarum\Extension\Extension;
use Flarum\Extension\ExtensionManager;
use Illuminate\Contracts\Container\Container;

class EnableToolbar implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        /** @var ExtensionManager $extensions */
        $extensions = $container->make(ExtensionManager::class);

        // Enable the bbcode toolbar when markdown isn't enabled.
        // Proxy the request through the extender for forward compatibility.
        if (! $extensions->isEnabled('flarum-markdown')) {
            (new Frontend('forum'))
                ->js(__DIR__.'/../../js/dist/forum.js')
                ->extend($container, $extension);
        }
    }
}
