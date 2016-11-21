#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

# Copyright 2016 Eddie Antonio Santos <easantos@ualberta.ca>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


from path import Path
from tqdm import tqdm
import sh

from corpus import Corpus

FIND_STRINGS_PATH = Path(__file__).parent / 'bin/find-strings'
assert FIND_STRINGS_PATH.exists()

analyze_source = sh.Command(FIND_STRINGS_PATH)

PATHS = [
    Path('~easantos/Databases/javascript-sources.sqlite3').expand(),
    Path('~eddieantonio/Projects/miner/sources.sqlite3').expand(),
]

def get_database_filename():
    for path in PATHS:
        if path.exists():
            return path
    raise Exception("Could not find any database")


if __name__ == '__main__':
    filename = get_database_filename().abspath()
    corpus = Corpus.connect_to(filename)
    progress_bar = tqdm(corpus.iterate(with_hash=True),
                        total=len(corpus))

    for file_hash, tokens in progress_bar:
        if len(tokens) == 0:
            continue
        progress_bar.set_description('{%s}' % (file_hash,))
        analyze_source(filename, file_hash)
