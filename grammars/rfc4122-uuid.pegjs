/*
 * Copyright 2016 Eddie Antonio Santos <easantos@ualberta.ca>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Transliterated from: https://tools.ietf.org/html/rfc4122#page-4
 */

UUID
  = time_low "-" time_mid "-"
    time_high_and_version "-"
    clock_seq_and_reserved
    clock_seq_low "-" node

time_low
  = $( hexOctet hexOctet hexOctet hexOctet )
time_mid
  = $( hexOctet hexOctet )
time_high_and_version
  = $( hexOctet hexOctet )
clock_seq_and_reserved
  = hexOctet
clock_seq_low
  = hexOctet
node
  = $( hexOctet hexOctet hexOctet hexOctet hexOctet hexOctet )

hexOctet
  = $( hexDigit hexDigit )


hexDigit
  = "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" /
    "a" / "b" / "c" / "d" / "e" / "f" /
    "A" / "B" / "C" / "D" / "E" / "F"
